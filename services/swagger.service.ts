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
  private _current$: BehaviorSubject<Swagger>;
  current: Observable<Swagger>;

  constructor(private _http: Http, private _errorService: ErrorService) {
    this._current$ = <BehaviorSubject<Swagger>>new BehaviorSubject(null);
    this.current = this._current$.asObservable();
  }

  getSwagger(url: string): Promise<Swagger> {
    let headers = this.generateHeaders();
    let promise = this._http
      .get(url, { headers: headers})
      .toPromise();

    return promise
      .then(response => {
        let current = response.json();
        this._current$.next(current);
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
