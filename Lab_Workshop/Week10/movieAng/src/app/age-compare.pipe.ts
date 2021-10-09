import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'ageCompare'
})
export class AgeComparePipe implements PipeTransform {

  transform(value: number, args: number): string {
    let compare: string = '';
    if (args == 1) {
      if (value < 1980) {
        compare = 'Old'
      } else if (value > 1980 && value < 2000) {
        compare = 'Middle Aged'
      } else {
        compare = 'Young'
      }
    }else{
      let compare: string = '';
      if (value < 2000) {
        compare = 'Old'
      } else if (value > 2000 && value < 2010) {
        compare = 'Middle Aged'
      } else {
        compare = 'Young'
      }
    }
    return compare
  }

}
