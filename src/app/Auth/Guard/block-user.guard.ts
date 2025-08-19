import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blockUserGuard: CanActivateFn = (route, state) => { 
  let router = inject(Router);

  const isLogin = !! localStorage.getItem('token') && 
                      localStorage.getItem('token') != null &&
                      localStorage.getItem('token') != ""

  if(!isLogin){
    router.navigate(['auth/login'])
    return true;
  }else{
    return false;
  }
};
