import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/localstorage.service';

export const loginRestriccionGuard: CanActivateFn = (route, state) => {
  const local = inject(StorageService);
  const rutas=inject(Router)
  const tipoUsuario = local.getItem('user');
  if (tipoUsuario) {
    rutas.navigate(['../'])
    return false;
  } else {
    return true;
  }
};
