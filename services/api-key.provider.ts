import { Injectable } from '@angular/core';

@Injectable()
export class ApiKeyProvider {
  name: string = 'apikey';
  location: ApiKeyLocation = 'header';
  apikey: string;
}

export type ApiKeyLocation = 'header'|'query';
