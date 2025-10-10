import { CanActivateFn } from '@angular/router';

export const guardMiembrosGuard: CanActivateFn = (route, state) => {
  let permisosUsuario:any = localStorage.getItem('permisosMiembro');
  return permisosUsuario==="true" || false;
};
