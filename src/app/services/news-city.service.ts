import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsCityService {

  /*
     1. fare chiamata API per ricevere le news
        -scegliere il sito da cui prendere le news
     2.filtare le news in base a
          - città
          -categoria: 
             -history
             -future
      3.Mandare i dati al componente che li visualizza
  
  */
  
      // API del Minitero della Cultura
      private apiEventUrl = 'https://opendata.beniculturali.it/ws/rest'


    


        
}
