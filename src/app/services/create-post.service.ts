/*SERVIZIO DEL COMPONENTE POST: ISERISCO LA LOGICA PER LACHIAMATA ALL'API */

import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  /* 1.Chiamata alla API(endpoit delle API che si vuole usare);
     2.Dichiarare con constructor che si usa HttpCLient ed è privato;
     3.Creare una funzione con Observable per usare il token e verificarlo (HttpHeaders: 'Bearer ${token}')
       token c4b96ee906b520a132c4e7b6e53b560f1e5f182ddafc3c968da651a76dcbeea6
     4.INserire anche i dati per una immagine se prevista
     5.Inviare la richiesta POST
  */

  private apiUrl = '/public/v2/users/7583045/posts';

  constructor(private http: HttpClient){}

  richiestaNuovoPost(token:string, content: string, image?: File): Observable<any> {
    const headers = new HttpHeaders({
      Authentization: `Bearer ${token}`
    })

    //inserire qui la istanza per prendere la immagine dal contenitore

    const formData = new FormData();
    formData.append('content', content);
    if(image){formData.append('image',image)}



    return this.http.post(this.apiUrl, formData ,{headers})
  }


  

}

