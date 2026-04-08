import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
private token = environment.GOREST_APIKEY;
private userId = environment.USER_ID;
private platformId = inject(PLATFORM_ID);


 // controlla se token è presente
isLoggedIn(): boolean {
  if(isPlatformBrowser(this.platformId)){
        return localStorage.getItem('token') !== null

  }
  return false
}

getUserId(): number{
  if(isPlatformBrowser(this.platformId)){
    return Number(localStorage.getItem('userId') )
  }
  return 0
}


// salvare il token nel localstorage
login(){
  if(isPlatformBrowser(this.platformId)){
       localStorage.setItem('token', this.token);
      localStorage.setItem('userId', environment.USER_ID.toString())
  }
}

logout(){
  if(isPlatformBrowser(this.platformId)){
    return localStorage.removeItem('token')
  }
}



}
