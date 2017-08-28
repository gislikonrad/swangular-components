import { Injectable } from '@angular/core';

@Injectable()
export class ApiKeyService {    
  name: string = 'apikey';
  location: ApiKeyLocation = 'header';
  apikey: string;
}

export type ApiKeyLocation = 'header'|'query';