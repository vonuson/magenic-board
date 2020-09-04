import { Injectable } from '@angular/core';

import { IOrder } from '@shared/model/contract/order';

@Injectable()
export class ArrayExtensionService {

  constructor() { }

  public compareSortEntry(a: number, b: number): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  public getNextCardOrder(array: IOrder[]): number {
    if (array && array.length > 0 ) {
      return array.reduce(
        (prev, curr) => (prev.order > curr.order) ? prev : curr
      ).order + 1;
    }
    return 1;
  }
}
