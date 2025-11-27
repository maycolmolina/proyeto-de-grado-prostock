import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { StorageService } from '../services/localstorage.service';

export const clienteRestriccionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const local=inject(StorageService)
  const tipoUsuario=local.getItem('user').tipo;
   if (tipoUsuario === 'admin') {
    return true;
  } else {
    router.navigate(['/no-autorizado']);
    return false;
  }

};
