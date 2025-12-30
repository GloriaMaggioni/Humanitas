import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Card } from '../models/eventCard.model';
@Injectable({
  providedIn: 'root',
})
export class EventCardService {  
  // NON PASSA IL CORS
  private apiUrl = 'https://openagenda.openpa.opencontent.io/api/opendata/v2/content/search/classes/event';

  constructor(private http: HttpClient) { }

  getCards(): Observable <Card[]> {
    return this.http.get<Card[]>(this.apiUrl)

  }










}
