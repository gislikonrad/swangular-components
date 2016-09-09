import { Injectable } from '@angular/core';
import { Swagger } from '../schema/2.0/swagger.schema';
import { Http, Headers } from '@angular/http';
import { ErrorService } from './error.service';
import { NextObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SwaggerService {
  private _subject$: BehaviorSubject<Swagger>;
  subscription: Observable<Swagger>;

  get latest(): Swagger {
    return this._subject$.getValue();
  }

  constructor(private _http: Http, private _errorService: ErrorService) {
    this._subject$ = <BehaviorSubject<Swagger>>new BehaviorSubject(null);
    this.subscription = this._subject$.asObservable();
  }

  getSwagger(url: string): Promise<Swagger> {
    let headers = this.generateHeaders();
    let promise = this._http
      .get(url, { headers: headers})
      .toPromise();

    return promise
      .then(response => {
        let current = response.json();
        this._subject$.next(current);
        return current;
      })
      .catch(error => {
        let message = `Could not get swagger from "${url}"`;
        console.warn('An error occurred', message);
        this._errorService.setError(message);
        return Promise.resolve(null);
      });
  }

  private generateHeaders(): Headers {
    let map = {

    };
    let headers = new Headers(map);
    return headers;
  }
}
