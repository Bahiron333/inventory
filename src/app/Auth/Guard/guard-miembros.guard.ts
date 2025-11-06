import { CanActivateFn } from '@angular/router';

export const guardMiembrosGuard: CanActivateFn = (route, state) => {
  let permisosUsuario:any =  localStorage.getItem('permisos');
  permisosUsuario = JSON.parse(permisosUsuario);
  return permisosUsuario[2].ver;
};
