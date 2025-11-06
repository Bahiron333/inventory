import { CanActivateFn } from '@angular/router';

export const guardUsuariosGuard: CanActivateFn = (route, state) => {
  let permisosUsuario:any =  localStorage.getItem('permisos');
  permisosUsuario = JSON.parse(permisosUsuario);
  return permisosUsuario[0].ver;
};
