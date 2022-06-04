import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringIsNull'
})
export class StringIsNullPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (value == null) {
      value = args;
    }
    else if (value.lastIndexOf('IMG') > -1) {
      let index = value.lastIndexOf('IMG');
      value = value.slice(index);
    }
    return value;
  }
}
