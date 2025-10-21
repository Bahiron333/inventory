import { CanActivateFn } from '@angular/router';

export const suspendidoGuard: CanActivateFn = (route, state) => {
  let dato = localStorage?.getItem('suspendido')==="true" || false;
  return !dato;
};
