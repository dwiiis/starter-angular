import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  includesNull(val: any) {
    const nullVal = [null, 'null', undefined, 'undefined', '', [], '00'];
    return nullVal.includes(val);
  }
}
