import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { carousel } from '../../models/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import {  RouterOutlet } from "@angular/router";
import { FirestoreService } from '../../services/firestore-service';
import { NewsCityService } from '../../services/news-city.service';
import { futureNewsCard } from '../../models/futureNews.model';
import { Paginator } from '../paginator/paginator';


@Component({
  selector: 'app-future-page',
  standalone:true,
  imports: [CarouselComponent, RouterOutlet, Paginator],
  templateUrl: './future-page.component.html',
  styleUrl: './future-page.component.css'
})
export class FuturePageComponent implements OnInit{
private firestoreService = inject(FirestoreService);
private cdr = inject(ChangeDetectorRef)
private futureNewsService  = inject(NewsCityService)

    characters : any[] = []    // array per immagazzinare i dati per il carousel
    newsCard : futureNewsCard[] = []    // array per imagazzinare i dati per le news
   /*
     ho bisogno: ---> li imposto come @Input() senza dargli un valore (vengono dati i valori dal paginator)
        1. currentPage -- > prende solo il dato dal paginator(viene impostato in paginator)    
        2. totalPages ---> prende solo il dato dal paginator(viene calcolato in paginator)
        3.offset
        4.imposta newsPerPage
   */
    
  /*
     @Input() currentPage: number = 1;
    limit: number = 10; // numero di news da visualizzare per pagina
     offset = (this.currentPage - 1) * this.limit; // indica alla API da quale pagina partire

*/


    @Input() currentPage: number = 1  ;     //DA CONTROLLARE PERCHè IMPOSTANDO COSI CURRENTPAGE E LIMIT FUNZIONA 
    @Input() limit: number = 20;    // indica le newsPerPage
    @Input() offset: number = (this.currentPage - 1) * this.limit;


  ngOnInit(): void {
    this.prendiCharacters();
    this.loadNews(); 
  }

  // presi i dati dei personaggi per il carousel
  async prendiCharacters(){
    this.characters= await this.firestoreService.getCharacters('future');
    this.cdr.detectChanges();
  }

  
  // funzione per mostrare le news dalla chiamata API al server di Regione Lombardia
  loadNews(){   
    let newsPerPage = this.offset;

    this.futureNewsService.getNewsEvents(this.limit, newsPerPage).subscribe({
      next: data =>{
        this.newsCard = data;
        this.cdr.detectChanges();
    
      },
      error: err =>{ 
        console.error('Errore:', err)
      }
    })
   
  }
/*
  //evento click per il cambio pagina con le news nuove
onChangePage(pageNumber : number){
   if( pageNumber < 1) return     // controllo per valori negativi: se false ferma tutto
   
   this.currentPage =  pageNumber;
   this.offset =  (this.currentPage - 1) * this.limit;
   this.loadNews();
}

*/
}
