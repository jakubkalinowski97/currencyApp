import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HistoryRate } from 'src/app/models/HistoryRate';

@Component({
  selector: 'app-last-thirty-days',
  templateUrl: './last-thirty-days.component.html',
  styleUrls: ['./last-thirty-days.component.scss']
})
export class LastThirtyDaysComponent implements OnInit, OnDestroy {
  historyRates$: Subscription;
  historyRates: HistoryRate[];
  baseCurrency$: Subscription;
  selectedCurrency: string;

  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartLabels: Label[] = [];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartPlugins = [];
  chartData: ChartDataSets[] = [{data:[], label: ''}];
  
  constructor(
    private currencyService: CurrencyService,
    private route: ActivatedRoute
  ) {}

  setChartType(value: ChartType) {
    this.chartType = value;
  }

  setSelectedDataFromParam() {
    this.selectedCurrency = this.route.snapshot.paramMap.get('currency') || '';
  }

  fetchHistoryData(): void {
    this.baseCurrency$ = this.currencyService.getCurrentCurrency().subscribe((base) => {
      this.historyRates$ = this.currencyService.fetchCurrencyLastThirtyDays(base, this.selectedCurrency).subscribe((historyRates) => {
        this.chartLabels = historyRates.rates.map((rate) => rate.date).sort();
        this.chartData = [{
          data: historyRates.rates.map((rate) => rate.rate),
          label: this.selectedCurrency || base,
        }]
      });
    }); 
  }

  ngOnInit(): void {
    this.setSelectedDataFromParam();
    this.fetchHistoryData();
  }

  ngOnDestroy(): void {
    this.historyRates$.unsubscribe();
    this.baseCurrency$.unsubscribe();
  }

}
