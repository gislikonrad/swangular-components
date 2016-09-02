import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'first'
})
// The work of the pipe is handled in the tranform method with our pipe's class
export class FirstPipe implements PipeTransform {
  transform(value: any) : any[] {
    if(value == undefined || value == null || !Array.isArray(value)) {
      return value;
    }

    if(value.length < 1) {
      return null;
    }

    return value[0];
  }
}
