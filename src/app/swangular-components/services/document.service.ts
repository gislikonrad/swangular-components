import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import 'rxjs/add/operator/toPromise';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
import { ErrorService } from "./error.service";

@Injectable()
export class DocumentService {
  // private _swagger$: BehaviorSubject<Swagger> = new BehaviorSubject<Swagger>(null);  

  constructor(
    private _http: Http,
    private _errorService: ErrorService
  ) { }

  getVersion(document: OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document): OpenApiVersion {
    var doc: any = document;
    return this.getDocumentationVersion(doc);
  }
 
  getSwagger(url: string): Promise<OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document> {
    let headers = this.generateHeaders();
    return this._http
      .get(url, { headers: headers })
      .toPromise()
      .then(response => {
        let json = response.json();
        let version = this.getDocumentationVersion(json);
        if(version) 
          return json as OpenAPIV2.Document;
        else if(version === OpenApiVersion.V3)
          return json as OpenAPIV3.Document;
        else if(version === OpenApiVersion.V3_1)
          return json as OpenAPIV3_1.Document;
        else 
          return null;
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

  private getDocumentationVersion(doc: any): OpenApiVersion {
    if(doc.swagger) {
      return OpenApiVersion.V2;
    }

    if(doc.openapi) {
      if(doc.openapi.startsWith('3.0')) {
        return OpenApiVersion.V3;
      }
      return OpenApiVersion.V3_1;
    }
    return null;
  }
}

export enum OpenApiVersion {
  V2 = '2.0',
  V3 = '3.0',
  V3_1 = '3.1'
}