import { TestBed, inject } from '@angular/core/testing';

import { ArrayExtensionService } from './array-extension.service';
import { IOrder } from '@shared/model/contract/order';

describe('ArrayExtensionService', () => {
  let service: ArrayExtensionService;
  let testArray: IOrder[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayExtensionService]
    });
  });

  beforeEach(() => {
    service = new ArrayExtensionService();
  });

  it('should be created', inject([ArrayExtensionService], (service: ArrayExtensionService) => {
    expect(service).toBeTruthy();
  }));

  describe('compareSortEntry()', () => {
    it('should return -1 when 1st argument is lower', () => {
      expect(service.compareSortEntry(1, 2)).toBe(-1);
      expect(service.compareSortEntry(-1, 2)).toBe(-1);
      expect(service.compareSortEntry(0, 200)).toBe(-1);
      expect(service.compareSortEntry(-2, -1)).toBe(-1);
    });

    it('should return 1 when 1st argument is higher', () => {
      expect(service.compareSortEntry(2, 1)).toBe(1);
      expect(service.compareSortEntry(2, -1)).toBe(1);
      expect(service.compareSortEntry(200, 0)).toBe(1);
      expect(service.compareSortEntry(-1, -2)).toBe(1);
    });

    it('should return 0 when 1st and 2nd argument is equal', () => {
      expect(service.compareSortEntry(1, 1)).toBe(0);
      expect(service.compareSortEntry(-1, -1)).toBe(0);
      expect(service.compareSortEntry(0, 0)).toBe(0);
      expect(service.compareSortEntry(200, 200)).toBe(0);
    });
  });

  describe('getNextCardOrder()', () => {
    it('should return 1 for undefined array', () => {
      expect(service.getNextCardOrder(testArray)).toBe(1);
    });

    it('should return 1 for empty array', () => {
      testArray = [];
      expect(service.getNextCardOrder(testArray)).toBe(1);
    });

    it('should return highest order + 1 of an array', () => {
      testArray.push({ order: 1});
      expect(service.getNextCardOrder(testArray)).toBe(2);

      testArray.push({ order: -2});
      expect(service.getNextCardOrder(testArray)).toBe(2);

      testArray.push({ order: 3});
      expect(service.getNextCardOrder(testArray)).toBe(4);

      testArray.push({ order: 2});
      expect(service.getNextCardOrder(testArray)).toBe(4);
    });
  });
});
