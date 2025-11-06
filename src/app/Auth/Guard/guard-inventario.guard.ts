import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

export const guardInventarioGuard: CanActivateFn = (route, state) => {
 let permisosUsuario:any =  localStorage.getItem('permisos');
  permisosUsuario = JSON.parse(permisosUsuario);
  return permisosUsuario[1].ver;
};
