import { Injectable } from '@angular/core';
import { Parameter, InLocations } from '../schema/2.0/swagger.schema';
import { Request, RequestMethod, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { ApiKeyProvider } from './api-key.provider';
import { SwaggerService } from './swagger.service';
import { AuthService } from './auth.service';

@Injectable()
export class RequestBuilder {
  // responseContentType: string;
  // requestContentType: string;

  forceSecure: boolean;

  constructor(private _swaggerService: SwaggerService, private _apiKeyProvider: ApiKeyProvider, private _authService: AuthService) {

  }

  generateRequest(url: string, method: string, parameters: any, parameterDefinitions: Parameter[]) : Request {
    let body: any;
    let query: string[] = [];
    url = this.createAbsoluteUrl(url);

    if(parameters && parameterDefinitions) {
      for(let parameter of parameterDefinitions) {
        let value = parameters[parameter.name];
        if(value == null || value == '') {
          continue;
        }
        if(parameter.in == InLocations.path){
          url = this.addParameterToUrlPath(url, parameter.name, parameters[parameter.name])
        }
        if(parameter.in == InLocations.query) {

          query.push(`${parameter.name}=${parameters[parameter.name]}`);
        }
        if(parameter.in == InLocations.body) {
          body = this.parseBody(parameters[parameter.name]);
        }
      }
    }

    let args = {
      url: url,
      method: this.getRequestMethod(method),
      responseType: ResponseContentType.Json,
      headers: this.generateCustomHeaders(),
      withCredentials: false,
      body: body,
      search: this.createSearch(query)
    };

    return new Request(args);
  }

  private createSearch(query: string[]): string {
    if(this._apiKeyProvider.apikey && this._apiKeyProvider.location == 'query') {
      query.push(`${this._apiKeyProvider.name}=${this._apiKeyProvider.apikey}`);
    }
    return query.join('&');
  }

  private generateCustomHeaders(): Headers {
    let map = {};

    if(this._apiKeyProvider.apikey && this._apiKeyProvider.location == 'header') {
      map[this._apiKeyProvider.name] = this._apiKeyProvider.apikey;
    }

    if(this._authService.accessToken && this._authService.tokenType) {
      map['Authorization'] = `${this._authService.tokenType} ${this._authService.accessToken}`;
    }

    return new Headers(map);
  }

  private getRequestMethod(method: string): RequestMethod {
    let lower = (method||'').toLowerCase();
    switch(lower) {
      case 'post': return RequestMethod.Post;
      case 'patch': return RequestMethod.Patch;
      case 'put': return RequestMethod.Put;
      case 'delete': return RequestMethod.Delete;
      case 'head': return RequestMethod.Head;
      case 'options': return RequestMethod.Options;

      case 'get':
      default: return RequestMethod.Get;
    }
  }

  private createAbsoluteUrl(url: string): string {
    let swagger = this._swaggerService.latest;
    let absolute = `${this.getScheme()}://${swagger.host}`;
    if(swagger.basePath) {
      absolute += swagger.basePath;
    }
    absolute += url;
    return absolute;
  }

  private getScheme(): string {
    let swagger = this._swaggerService.latest;
    if(this.forceSecure || swagger.schemes.indexOf('https') > -1) { // force or prefer https
      return 'https';
    }
    return swagger.schemes[0];
  }

  private addParameterToUrlPath(url: string, name: string, value: string): string {
    if(!value) {
      return url;
    }
    let parameter = '{' + name + '}';
    return url.replace(parameter, value);
  }

  private parseBody(body: string): any {
    if(!body) {
      return body;
    }
    if(/^[\[\{\"\d]/gim.test(body)) {
      try {
        return JSON.parse(body);
      }
      catch (error) {
        console.info(error);
      }
    }
    return body;
  }
}
