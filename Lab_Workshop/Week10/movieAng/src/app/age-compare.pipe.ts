import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCompare'
})
export class AgeComparePipe implements PipeTransform {

  transform(value: number): string {
    let compare: string = '';
    if(value<1980){
      compare = 'Old'
    }else if (value>1980&&value<2000){
      compare = 'Middle Aged'
    }else{
      compare = 'Young'
    }
    return compare
  }

}
