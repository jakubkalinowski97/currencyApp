import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  loaderDelay: number;
  totalRequest: number = 0;

  show(): void {
    this.totalRequest++;
    this.isLoading.next(true);
  }

  hide(): void {
    this.totalRequest--;
    if(this.totalRequest === 0) {
      this.isLoading.next(false);
    }
  }

  constructor() { }
}
