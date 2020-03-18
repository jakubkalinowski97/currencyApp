import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CurrencyInterceptor } from './interceptors/currency.interceptor';
import { AppComponent } from './app.component';
import { LatestRatesComponent } from './screens/latest-rates/latest-rates.component';
import { LastThirtyDaysComponent } from './screens/last-thirty-days/last-thirty-days.component';
import { TopFiveDifferencesComponent } from './screens/top-five-differences/top-five-differences.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LatestRatesComponent,
    LastThirtyDaysComponent,
    TopFiveDifferencesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CurrencyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
