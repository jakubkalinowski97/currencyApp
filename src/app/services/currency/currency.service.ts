import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { ExchangeRate } from 'src/app/models/ExchangeRate';
import { HistoryExchangeRate } from 'src/app/models/HistoryExchangeRate';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CURRENCIES } from 'src/app/shared/globals';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currentCurrency = new BehaviorSubject<string>('EUR');

  constructor(private http: HttpClient) { }

  calculateTrading(todayRate: number, yesterdayRate: number) {
    if (todayRate > yesterdayRate) {
      return 'INCREASE';
    } else if (todayRate < yesterdayRate){
      return 'DECREASE';
    } else {
      return 'FLAT';
    }
  };

  calculateDifference(todayRate: number, yesterdayRate: number) {
    return +(todayRate - yesterdayRate).toFixed(3);
  };

  calculateDifferencePercentage(todayRate: number, yesterdayRate: number) {
    return +((1 - yesterdayRate/todayRate) * 100).toFixed(2);
  };

  fetchCurrencyLatest(base: string): Observable<ExchangeRate> {
    return forkJoin([
      this.http.get<ExchangeRate>('latest', { params: { base } }),
      this.http.get<ExchangeRate>(`${moment().subtract(4, 'days').format('YYYY-MM-DD')}`, { params: { base } }),
    ])
      .pipe(
        map((exchangeRates) => ({
          ...exchangeRates[0],
          rates: Object.keys(exchangeRates[0].rates).map((currency) => ({
            currency: currency,
            rate: exchangeRates[0].rates[currency].toFixed(3),
            trading: this.calculateTrading(exchangeRates[0].rates[currency], exchangeRates[1].rates[currency]),
            difference: this.calculateDifference(exchangeRates[0].rates[currency], exchangeRates[1].rates[currency]),
            differencePercentage: this.calculateDifferencePercentage(exchangeRates[0].rates[currency], exchangeRates[1].rates[currency]),
          })),
        })),
      )
  }

  fetchCurrencyLastThirtyDays(base: string, symbol?: string,): Observable<HistoryExchangeRate> {
    let params = new HttpParams()
      .append('start_at', moment().subtract(1, 'months').format('YYYY-MM-DD'))
      .append('end_at', moment().format('YYYY-MM-DD'))

    if(symbol) {
      params = params
        .append('base', base)
        .append('symbols', symbol)
    } else {
      params = params.append('symbol', base);
    }

    return this.http.get<HistoryExchangeRate>(
        'history',
        {
          params,
        }
      )
      .pipe(
        map((historyExchangeRates) => ({
          ...historyExchangeRates,
          rates: Object.keys(historyExchangeRates.rates).map((date) => ({
            date: date,
            rate: symbol ? historyExchangeRates.rates[date][symbol] : historyExchangeRates.rates[date][base],
          })),
        })),
      )
  }

  fetchTopFiveDifferences(base: string, trading: string): Observable<ExchangeRate> {
    return this.fetchCurrencyLatest(base)
      .pipe(
        map((exchangeRate) => ({
          ...exchangeRate,
          rates: exchangeRate.rates
            .filter((rate) => rate.trading === trading)
            .sort((a, b) => (
              trading === 'INCREASE' ? b.difference - a.difference : a.difference - b.difference
            ))
            .slice(0, 5)
        })),
      )
  }

  setCurrentCurrency(currency: string) {
    this.currentCurrency.next(currency);
  }

  getCurrentCurrency(): Observable<string> {
    return this.currentCurrency;
  }

  getListOfCurrencies(): string[] {
    return CURRENCIES;
  }
}
