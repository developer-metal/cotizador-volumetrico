import { TestBed } from '@angular/core/testing';

import { PackageOrderService } from '../model/services/package-order.service';

describe('PackageOrderService', () => {
  let service: PackageOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
