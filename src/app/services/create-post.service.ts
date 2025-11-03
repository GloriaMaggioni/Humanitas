/*SERVIZIO DEL COMPONENTE POST: ISERISCO LA LOGICA PER LACHIAMATA ALL'API */

import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* creo l'interfaccia per il post*/
// export interface Post {
//   userId: number | string,
//   description: string,
//   image: File, //l'untente la carica dal proprio pc
// } 
@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  // private postUrl = '/public/v2/users/7582975/posts'  //Api esterno

  constructor(private http: HttpClient) { }


  // createPost(post: Post):Observable<Post>{
  //   return this.http.post<Post>(this.postUrl, post)
  // }
}
