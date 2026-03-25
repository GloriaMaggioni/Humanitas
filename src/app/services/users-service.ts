import { ChangeDetectorRef, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { User } from '../models/users';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import {onSnapshot} from '@angular/fire/firestore'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UsersService  {

   private http = inject(HttpClient);
   private apiUrl : string=  'https://gorest.co.in/public/v2/users';     // api url per users
    private myToken: string = environment.GOREST_APIKEY;
   // my api token
   private headers = new HttpHeaders({                                                                    // impostazione http headers
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myToken
   })

   users$ = new BehaviorSubject<User[]>([]);     // immagazzina i dati degli users
   totalUser$ = new BehaviorSubject<number>(0)   // totale degli users

   
   // metodo per aggiunger un nuovo user (call api)
   addUser(body: {}){
    return this.http.post(this.apiUrl, body, {headers: this.headers})
   }


   // metodo per prendere i dati degli user
   getUser(pageNumber : number = 1, searchText?: string){
    if(typeof searchText !== 'undefined' ){
      const searchUserUrl : string =  `https://gorest.co.in/public/v2/users?name=${searchText}&per_page=30`

      this.http.get(`${searchUserUrl}`, {headers: this.headers, observe: 'response'}).subscribe({
        next : (response: any) =>{
          this.users$.next(response.body);
          console.log('users$ dal metodo per filtrare gli utenti:', this.users$)
        },
        error: (error : any) => {
          console.error('Errore nella ricerca utente. Inserire testo valido', error)
        }
      })
    }else {
      this.http.get(`https://gorest.co.in/public/v2/users?page=${pageNumber}&per_page=30`, {headers: this.headers, observe: 'response'}).subscribe({
      next: (response : any) =>{
        this.users$.next(response.body)
        const total = response.headers.get('X-Pagination-Total')
        this.totalUser$.next(Number(total))
        console.log('Utenti totali', total)
      },

      error: (error: any) => {
        console.error("Errore nell'inviare i dati degli utenti", error)
      }
    })

    }
   
    
   }

  // metodo per eliminare un user  
   deleteUser( idUser : number | undefined){
     return this.http.delete(`${this.apiUrl}/${idUser}`, {headers: this.headers})
   }

 


}