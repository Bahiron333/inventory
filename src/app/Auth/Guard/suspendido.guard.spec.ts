import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { suspendidoGuard } from './suspendido.guard';

describe('suspendidoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => suspendidoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
