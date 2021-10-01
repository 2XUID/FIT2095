import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'w10strsub'
})
export class W10strsubPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    return null;
  }
}