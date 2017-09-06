import { Injectable } from '@angular/core';

@Injectable()
export class JsonReferenceService {

  constructor() { }

  dereference<T>(obj: any, $ref: string): T {
    if(!$ref.startsWith('#/')) {
      console.warn('Invalid $ref. Only references to current document supported.', $ref);
      return null;
    }

    let parts = $ref.substr(2).split('/');
    for(let i = 0; i < parts.length; i++) {
      obj = obj[parts[i]];
      if(obj === undefined) return null;
    }
    return <T>obj;
  }
}
