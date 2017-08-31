import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Swagger } from "swagger-schema-ts";
import 'rxjs/add/operator/toPromise';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
import { ErrorService } from "../services/error.service";

@Injectable()
export class SwaggerService {
  // private _swagger$: BehaviorSubject<Swagger> = new BehaviorSubject<Swagger>(null);  

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
        // this._swagger$.next(swagger);
        return swagger;
      })
      .catch(error => {
        // this._swagger$.next(null);
        let message = `Could not get swagger from "${url}"`;
        this._errorService.setError(message);
        return null;
      });
  }    

  // get current(): Observable<Swagger> {
  //   return this._swagger$.asObservable();
  // }

  // get snapshot(): Swagger {
  //   return this._swagger$.getValue();
  // }

  private generateHeaders(): Headers {
    let map = {

    };
    let headers = new Headers(map);
    return headers;
  }
}
