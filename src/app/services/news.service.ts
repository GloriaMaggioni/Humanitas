import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
 
private http = inject(HttpClient);
    
     


    fetchData(endpoint: string, limit: number, offset: number = 0): Observable<any> {

       const params = new HttpParams()
          .set('$limit', limit.toString())
          .set('$offset', offset.toString())

       return this.http.get<any[]>(endpoint, {params})
    }
  
}

   

        

