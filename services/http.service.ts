import { Injectable } from '@angular/core';
import { Request, Response, Http } from '@angular/http';
import { ErrorService } from './error.service';
import { NextObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  private _requestSubject$: BehaviorSubject<Request>;
  private _responseSubject$: BehaviorSubject<Response>;
  request: Observable<Request>;
  response: Observable<Response>;

  constructor(private _http: Http, private _errorService: ErrorService) {
    this._requestSubject$ = <BehaviorSubject<Request>>new BehaviorSubject(null);
    this._responseSubject$ = <BehaviorSubject<Response>>new BehaviorSubject(null);

    this.request = this._requestSubject$.asObservable();
    this.response = this._responseSubject$.asObservable();
  }

  dispatch(request: Request) {
    this._responseSubject$.next(null);
    this._requestSubject$.next(request);
    let promise = this._http.request(request).toPromise();
    promise
      .then(response => {
        this._responseSubject$.next(response);
      })
      .catch(response => {
        this._responseSubject$.next(response);
      });
  }

  clear() {
    this._requestSubject$.next(null);
  }
}
