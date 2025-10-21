import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardMiembrosGuard } from './guard-miembros.guard';

describe('guardMiembrosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardMiembrosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
