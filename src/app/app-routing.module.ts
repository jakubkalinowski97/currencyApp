import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestRatesComponent } from './screens/latest-rates/latest-rates.component';
import { LastThirtyDaysComponent } from './screens/last-thirty-days/last-thirty-days.component';
import { TopFiveDifferencesComponent } from './screens/top-five-differences/top-five-differences.component';


const routes: Routes = [
  {
    path: 'latest',
    component: LatestRatesComponent
  },
  {
    path: 'last-thirty-days',
    component: LastThirtyDaysComponent
  },
  {
    path: 'last-thirty-days/:currency',
    component: LastThirtyDaysComponent
  },
  {
    path: 'top-five-differences',
    component: TopFiveDifferencesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
