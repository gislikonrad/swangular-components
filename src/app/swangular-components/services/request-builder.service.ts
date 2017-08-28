import { Injectable } from '@angular/core';
import { InLocations, Parameter } from "swagger-schema-ts";
import { ResponseContentType, RequestMethod, Request, Headers } from "@angular/http";
import { SwaggerService } from "./swagger.service";
import { OAuthService } from "./o-auth.service";
import { ApiKeyService } from "./api-key.service";

@Injectable()
export class RequestBuilderService {

  constructor(
    private _swaggerService: SwaggerService,
    private _oauthService: OAuthService,
    private _apiKeyService: ApiKeyService
  ) { }

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
    if(this._apiKeyService.apikey && this._apiKeyService.location == 'query') {
      query.push(`${this._apiKeyService.name}=${this._apiKeyService.apikey}`);
    }
    return query.join('&');
  }

  private generateCustomHeaders(): Headers {
    let map = {};

    if(this._apiKeyService.apikey && this._apiKeyService.location == 'header') {
      map[this._apiKeyService.name] = this._apiKeyService.apikey;
    }

    if(this._oauthService.accessToken && this._oauthService.tokenType) {
      map['Authorization'] = `${this._oauthService.tokenType} ${this._oauthService.accessToken}`;
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
    let swagger = this._swaggerService.snapshot;
    let absolute = `${this.getScheme()}://${swagger.host}`;
    if(swagger.basePath) {
      absolute += swagger.basePath;
    }
    absolute += url;
    return absolute;
  }

  private getScheme(): string {
    let swagger = this._swaggerService.snapshot;
    if(swagger.schemes.indexOf('https') > -1) { // prefer https
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
