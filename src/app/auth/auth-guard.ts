import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth-service';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

if (!isPlatformBrowser(platformId)) {
  return false;
}
    const authService = inject(AuthService);
    const router = inject(Router)

   if(authService.isLoggedIn() ){
  
    return true;
   }else{
    router.navigate(['login']);
    return false
   }
};
