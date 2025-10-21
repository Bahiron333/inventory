import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blockUserGuard: CanActivateFn = (route, state) => { 
  let router = inject(Router);
  const isLogin = !! localStorage.getItem('token') && 
                      localStorage.getItem('token') != null &&
                      localStorage.getItem('token') != ""

  isLogin ? router.navigate(['dashboard', localStorage.getItem('id')]) : router.navigate(['/'])

  return isLogin;
};
