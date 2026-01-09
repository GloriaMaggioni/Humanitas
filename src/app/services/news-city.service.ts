import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { futureNewsCard } from '../models/futureNews.model';

@Injectable({
  providedIn: 'root',
})
export class NewsCityService {
  /*
    mia chiave api
     Id = 799cetvgyj7yux255fpuqrprj
     Codice chiave segreto = 3wtdsq09fx149nsgn0ix96hntwq91oslv7d7tzn1fel0wiz8ts
     App token = e5SVtvD4Ebdo4zmx942J5o1ad
  */

      private http = inject(HttpClient);
    


      //API della Regione Lombardia
      private apiUrl = 'https://www.dati.lombardia.it/resource/uzy5-pr9h.json';   // dataset per Eventi culturali

      getNewsEvents(limit: number, offset:number = 0){
        const params = new HttpParams()
           .set('$limit', limit.toString())
           .set('$offset', offset.toString())
        return this.http.get<any[]>(this.apiUrl, {params})
      }

  
}

   

        

