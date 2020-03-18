import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { Subscription } from 'rxjs';
import { Rate } from 'src/app/models/Rate';

@Component({
  selector: 'app-latest-rates',
  templateUrl: './latest-rates.component.html',
  styleUrls: ['./latest-rates.component.scss']
})
export class LatestRatesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Currency', 'Spot', 'Increase / Decrease', 'Chart'];
  ratesList$: Subscription;
  ratesList: Rate[];
  currency$: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currency$ = this.currencyService
      .getCurrentCurrency()
      .subscribe((currency) => {
        this.ratesList$ = this.currencyService
          .fetchCurrencyLatest(currency)
          .subscribe((exchangeRate) => { this.ratesList = exchangeRate.rates});
      });
  }

  ngOnDestroy(): void {
    this.ratesList$.unsubscribe();
    this.currency$.unsubscribe();
  }
}
