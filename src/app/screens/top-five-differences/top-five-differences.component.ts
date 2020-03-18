import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Rate } from 'src/app/models/Rate';
import { Trading } from 'src/app/models/Trading';

@Component({
  selector: 'app-top-five-differences',
  templateUrl: './top-five-differences.component.html',
  styleUrls: ['./top-five-differences.component.scss']
})
export class TopFiveDifferencesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Currency', 'Difference', 'Percentage'];

  topFiveDifferencesIncreased$: Subscription;
  topFiveDifferencesIncreased: Rate[];
  topFiveDifferencesDecreased$: Subscription;
  topFiveDifferencesDecreased: Rate[];
  currency$: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currency$ = this.currencyService
      .getCurrentCurrency()
      .subscribe((currency) => {
        this.topFiveDifferencesIncreased$ = this.currencyService
          .fetchTopFiveDifferences(currency, 'INCREASE')
          .subscribe((exchangeRate) => { this.topFiveDifferencesIncreased = exchangeRate.rates});
        this.topFiveDifferencesDecreased$ = this.currencyService
          .fetchTopFiveDifferences(currency, 'DECREASE')
          .subscribe((exchangeRate) => { this.topFiveDifferencesDecreased = exchangeRate.rates});
      });
  }

  ngOnDestroy(): void {
    this.currency$.unsubscribe();
    this.topFiveDifferencesDecreased$.unsubscribe();
    this.topFiveDifferencesIncreased$.unsubscribe();
  }
}
