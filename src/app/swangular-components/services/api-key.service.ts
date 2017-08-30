import { Injectable } from '@angular/core';

@Injectable()
export class ApiKeyService {    
  public name: string = 'apikey';
  public location: ApiKeyLocation = 'header';
  public apikey: string;
}

export type ApiKeyLocation = 'header'|'query';