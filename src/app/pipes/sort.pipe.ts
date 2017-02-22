import { Pipe } from '@angular/core';


@Pipe({ name: 'sort' })
export class SortPipe {
  transform(items: Array<any>, sortProp: string) {
    if(sortProp === undefined || sortProp === null){
      return items;
    }

    if(items === undefined || items === null){
      return [];
    }
    
    return [...items].sort((a, b) => {
      return a[sortProp] > b[sortProp] ? 1 :
             a[sortProp] === b[sortProp] ? 0 : -1;
    });
  }
}
