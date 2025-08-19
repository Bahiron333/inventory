import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blockUserGuard } from './block-user.guard';

describe('blockUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => blockUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
