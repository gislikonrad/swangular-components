import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keyValuePairs'
})
// The work of the pipe is handled in the tranform method with our pipe's class
export class KeyValuePairsPipe implements PipeTransform {
  transform(value: any) : KeyValuePair[] {
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
