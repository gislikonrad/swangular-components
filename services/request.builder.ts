import { Injectable } from '@angular/core';
import { Parameter, InLocations } from '../schema/2.0/swagger.schema';
import { Request, RequestMethod, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { ApiKeyProvider } from './api-key.provider';
import { SwaggerService } from './swagger.service';
import { TokenService } from './token.service';

@Injectable()
export class RequestBuilder {
  responseContentType: string;
  requestContentType: string;

  constructor(private _swaggerService: SwaggerService, private _apiKeyProvider: ApiKeyProvider, private _tokenService: TokenService) {

  }

  generateRequest(url: string, method: string, parameters: any, parameterDefinitions: Parameter[]) : Request {
    let body: any;
    let query: string[] = [];
    url = this.createAbsoluteUrl(url);

    if(parameters) {
      for(let parameter of parameterDefinitions) {
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

    if(this._tokenService.accessToken && this._tokenService.tokenType) {
      map['Authorization'] = `${this._tokenService.tokenType} ${this._tokenService.accessToken}`;
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

  private createAbsoluteUrl(url: string) : string {
    let swagger = this._swaggerService.latest;
    let absolute = `${swagger.schemes[0]}://${swagger.host}`;
    if(swagger.basePath) {
      absolute += swagger.basePath;
    }
    absolute += url;
    return absolute;
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
