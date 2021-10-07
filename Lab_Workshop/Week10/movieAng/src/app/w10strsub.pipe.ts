import {
  Pipe,
  PipeTransform
} from '@angular/core';
@Pipe({
  name: 'w10strsub'
})
export class W10strsubPipe implements PipeTransform {
  transform(value: number): number {
    return new Date().getFullYear() - value;
  }
}