import { ChangeDetectorRef, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { User } from '../models/users';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { SnackBar } from './snack-bar';
@Injectable({
  providedIn: 'root',
})
export class UsersService  {

   private http = inject(HttpClient);
   private snackBar = inject(SnackBar);

   private apiUrl : string=  'https://gorest.co.in/public/v2/users';     // api url per users
   private myToken: string = environment.GOREST_APIKEY;              
   private headers = new HttpHeaders({                                  // impostazione http headers
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myToken
   });


   users$ = new BehaviorSubject<User[]>([]);                           // immagazzina i dati degli users
   totalUser$ = new BehaviorSubject<number>(0)                        // totale degli users

   
   // metodo per aggiunger un nuovo user (call api)
   addUser(body: {}){
    return this.http.post(this.apiUrl, body, {headers: this.headers})
   }


   // metodo per prendere i dati degli user e per filtrarli in base al testo nella searchBar
   getUser(pageNumber : number = 1, searchText?: string, perPage: number = 30){
    if(typeof searchText !== 'undefined' ){
      const searchUserUrl : string =  `https://gorest.co.in/public/v2/users?name=${searchText}&per_page=${perPage}`;

      this.http.get(`${searchUserUrl}`, {headers: this.headers, observe: 'response'}).subscribe({
        next : (response: any) =>{
          this.users$.next(response.body);
        },
        error: (error : any) => {
          this.snackBar.openSnackBar('Errore nella ricerca utente. Inserire testo valido:')
        }
      })
    }else {
      this.http.get(`https://gorest.co.in/public/v2/users?page=${pageNumber}&per_page=${perPage}`, {headers: this.headers, observe: 'response'}).subscribe({
      next: (response : any) =>{
        this.users$.next(response.body)
        const total = response.headers.get('X-Pagination-Total')
        this.totalUser$.next(Number(total));
      },

      error: (error: any) => {
        this.snackBar.openSnackBar("Errore nell'inviare i dati degli utenti")
      }
    })

    }
   
    
   }

  // metodo per eliminare un user  
   deleteUser( idUser : number | undefined){
     return this.http.delete(`${this.apiUrl}/${idUser}`, {headers: this.headers})
   }

 


}