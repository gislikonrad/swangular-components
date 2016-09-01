import { Injectable } from '@angular/core';
import { Swagger } from '../schema/2.0/swagger.schema';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SwaggerService {
  constructor(private _http: Http) {}

  getSwagger(url: string): Promise<Swagger> {
    let headers = this.generateHeaders();
    let promise = this._http
      .get(url, { headers: headers})
      .toPromise();

    return promise
      .then(response => response.json())
      .catch(this.handleError);
  }

  private generateHeaders(): Headers {
    let map = {

    };
    let headers = new Headers(map);
    return headers;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
