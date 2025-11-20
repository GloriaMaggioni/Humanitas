import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../components/events-page/events-page';

@Injectable({
  providedIn: 'root'
})
export class EventCardService {
  private apiUrl = 'https://openagenda.openpa.opencontent.io/api/opendata/v2/content/read/da5c2ed8e77eae4169d434486fdd8865'

  constructor(private http: HttpClient) { }

  // prendere i dati con Observable

  getCards():Observable<Card[]>{
    return this.http.get<Card[]>(this.apiUrl)
  }
}
