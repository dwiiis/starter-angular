import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private globalSv: GlobalService) {}

  setFilter(name: string, value: any, eventTable: LazyLoadEvent) {
    if (this.globalSv.includesNull(value)) {
      return {};
    }

    return (eventTable.filters = {
      ...eventTable.filters,
      [name]: {
        value: value,
      },
    });
  }

  removeFilter(names: string[], eventTable: LazyLoadEvent) {
    for (let name of names) {
      return (eventTable.filters[name] = null);
    }
  }
}
