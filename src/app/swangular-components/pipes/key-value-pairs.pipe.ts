import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValuePairs'
})
export class KeyValuePairsPipe implements PipeTransform {

  transform(value: any, args?: any): KeyValuePair[] {
    if(value == undefined || value == null) {
      return [];
    }

    let array: KeyValuePair[] = [];
    for(let key in value) {
      if(value.hasOwnProperty(key)) {
        array.push(new KeyValuePair(key, value[key]));
      }
    }

    return array;
  }

}

export class KeyValuePair {
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
  key: string;
  value: any;
}