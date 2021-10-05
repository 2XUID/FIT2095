import {
  Pipe,
  PipeTransform
} from '@angular/core';
@Pipe({
  name: 'w10strsub'
})
export class W10strsubPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    let transformedStr = '';
    let startingIndex = args[0];
    let stopIndex = args[1];
    transformedStr = value.substring(startingIndex, stopIndex);
    return transformedStr;
  }
}