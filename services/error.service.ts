import { Injectable } from '@angular/core';
import { NextObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ErrorService {
  private _latestError$: BehaviorSubject<string>;
  latestError: Observable<string>;

  constructor() {
    this._latestError$ = <BehaviorSubject<string>>new BehaviorSubject(null);
    this.latestError = this._latestError$.asObservable();
  }

  setError(description: string) {
    console.error(description);
    this._latestError$.next(description);
  }
}
