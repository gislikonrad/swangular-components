import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'first'
})
export class FirstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === undefined || value === null || !_.isArray(value)) return value;
    if(!value.length) return null;
    return _.first(value);
  }

}
