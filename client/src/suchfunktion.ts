import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
  transform(arbeiten: any[], filter: string): any {
    if (!filter){
      return arbeiten;
    }
    if (!arbeiten){
      return []
    }
   filter = filter.toLowerCase();
   return arbeiten.filter(abschlussarbeit => {return abschlussarbeit.titel.toLowerCase().includes(filter);});
  }
}
