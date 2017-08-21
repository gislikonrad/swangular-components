import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Swagger } from "../schema/2.0/swagger.schema";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from "../services/error.service";

@Injectable()
export class SwaggerService {
  private _swagger$: BehaviorSubject<Swagger> = new BehaviorSubject<Swagger>(null);  

  constructor(
    private _http: Http,
    private _errorService: ErrorService
  ) { }
 
  getSwagger(url: string): Promise<Swagger> {
    let headers = this.generateHeaders();
    return this._http
      .get(url, { headers: headers })
      .toPromise()
      .then(response => {
        let swagger =  <Swagger>response.json();
        this._swagger$.next(swagger);
        return swagger;
      })
      .catch(error => {
        this._swagger$.next(null);
        let message = `Could not get swagger from "${url}"`;
        this._errorService.setError(message);
        return null;
      });

    // return promise
    //   .then(response => {
    //     let current = response.json();
    //     this._subject$.next(current);
    //     return current;
    //   })
    //   .catch(error => {
    //     let message = `Could not get swagger from "${url}"`;
    //     console.warn('An error occurred', message);
    //     this._errorService.setError(message);
    //     return Promise.resolve(null);
    //   });
  }    

  get current(): Observable<Swagger> {
    return this._swagger$.asObservable();
  }

  get snapshot(): Swagger {
    return this._swagger$.getValue();
  }

  private generateHeaders(): Headers {
    let map = {

    };
    let headers = new Headers(map);
    return headers;
  }
}
