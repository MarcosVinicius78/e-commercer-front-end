/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderHistoryService } from './OrderHistory.service';

describe('Service: OrderHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderHistoryService]
    });
  });

  it('should ...', inject([OrderHistoryService], (service: OrderHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
