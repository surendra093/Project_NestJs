import { Opening } from './shared/opening.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(openings:Opening[],searchValue: string): Opening[] {
       if(!openings || !searchValue){
           return openings;
       }
      
       return openings.filter(opening =>
          opening.jobtitle.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          opening.location.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) );
          
  }

}
