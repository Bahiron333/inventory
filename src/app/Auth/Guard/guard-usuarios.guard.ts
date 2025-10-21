import { CanActivateFn } from '@angular/router';

export const guardUsuariosGuard: CanActivateFn = (route, state) => {
  let permisosUsuario:any = localStorage.getItem('permisosUsuario');
  return permisosUsuario==="true" || false;
};
