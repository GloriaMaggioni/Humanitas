import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { User } from '../models/users';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import {onSnapshot} from '@angular/fire/firestore'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService  {

   private http = inject(HttpClient);
   private apiUrl : string=  `https://gorest.co.in/public/v2/users?per_page=30`;                // api url per users
   private myToken: string = '9f79a463da6140766583d2d2fa30e7d197680a4168d9b7bd83fb5bdf501e6dec';   // my api token
   private headers = new HttpHeaders({      // impostazione http headers
    'Content-Type': 'Application/json',
    'Authorization': 'Bearer ' + this.myToken
   })

   users$ = new BehaviorSubject<User[]>  ([]); //immagazzina i dati degli users
   searchUser = new BehaviorSubject<string>(''); // variabile per il testo della ricerca del user

   // api call
   addUser( body: {}){
     return this.http.post(this.apiUrl, body, {headers: this.headers})
   }


  // metodo per prendere i dati dell'user
   getUser(pageNumber : number = 1){
     this.http.get(`https://gorest.co.in/public/v2/users?page=${pageNumber}&per_page=30`).subscribe({
      next: (response: any) =>{
        
        this.users$.next(response)
      },
      error: (error : any) => console.error('Errore', error)
    })
   }









}