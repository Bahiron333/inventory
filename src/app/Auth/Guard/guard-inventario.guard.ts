import { CanActivateFn } from '@angular/router';

export const guardInventarioGuard: CanActivateFn = (route, state) => {
  let permisosUsuario:any = localStorage.getItem('permisosInventario');
  return permisosUsuario==="true" || false;
};
