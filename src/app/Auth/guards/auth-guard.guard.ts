import { CanActivateFn, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  if(localStorageService.getVariable('token')){

    return true;
  }else {
    router.navigate(['']);
    return false;
  }
};
