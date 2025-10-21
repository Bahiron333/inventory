import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardUsuariosGuard } from './guard-usuarios.guard';

describe('guardUsuariosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardUsuariosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
