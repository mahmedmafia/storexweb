import { InvokeFunctionExpr } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/auth/auth.service';
import { Movie } from './movies.service';

@Pipe({
  name: 'SearchItem'
})
export class SearchItemPipe implements PipeTransform {

  transform<T extends Movie>(items: T[]| null, searchText: string, searchTerm: string): T[]  {
    if (!items) return []
    if (!searchText || searchText == '') return items;
    return this.searchItems(items, searchText.toLowerCase(), searchTerm);
  }
  private searchItems(items: any[], searchText: string, searchTerm: string): any[] {
    let results: any[] = [];
    items.forEach(item => {
      if (item[searchTerm].toLowerCase().includes(searchText)) {
        results.push(item);
      }
    });
    return results;
  }
}
