import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency/currency.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CurrencyApp';
  currenciesList: string[];
  
  currencyForm = new FormGroup({
    currentCurrency: new FormControl('EUR'),
  });

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currenciesList = this.currencyService.getListOfCurrencies();
    this.currencyForm.get('currentCurrency').valueChanges.subscribe((value) => this.currencyService.setCurrentCurrency(value))
  }
}
