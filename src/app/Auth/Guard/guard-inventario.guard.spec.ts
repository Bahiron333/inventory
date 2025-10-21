import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardInventarioGuard } from './guard-inventario.guard';

describe('guardInventarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardInventarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
