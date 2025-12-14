import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private messageSource = new BehaviorSubject<string | null>(null);
  message$ = this.messageSource.asObservable();

  show(message: string) {
    this.messageSource.next(message);
  }

  clear() {
    this.messageSource.next(null);
  }
}
