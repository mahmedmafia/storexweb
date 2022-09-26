import { InvokeFunctionExpr } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/auth/auth.service';
import { Movie } from './movies.service';

@Pipe({
  name: 'SearchItem'
})
export class SearchItemPipe implements PipeTransform {

  transform<T extends Movie>(items: T[] | null, searchTexts: string[], searchTerms: string[]): T[] {
    if (!items) return []
    let validSearchTexts = 0;
    let iteratedNum = searchTexts.length - 1;
    let searchKeys = [...searchTerms];
    let searchValues = [...searchTexts];
    while (iteratedNum >= 0) {
      if (searchValues[iteratedNum].trim() !== '') {
        validSearchTexts++;
      } else {
        searchValues.splice(iteratedNum, 1);
        searchKeys.splice(iteratedNum, 1);
      }
      iteratedNum--;
    }

    if (searchValues.length == 0) {
      return items;
    }

    return this.searchItems(items, searchValues, searchKeys);
  }
  private searchItems(items: any[], searchValues: string[], searchKeys: string[]): any[] {
    let results: any[] = [];
    items.forEach(item => {
      let matchValues = 0;
      for (let i = 0; i < searchValues.length; i++) {
        if (item[searchKeys[i]].toLowerCase().includes(searchValues[i].toLowerCase())) {
          matchValues++;
        }

      }
      if (matchValues == searchValues.length) {
        results.push(item);
      }

    });
    return results;
  }
}
