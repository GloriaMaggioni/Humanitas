import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { carousel } from '../../models/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import {  RouterOutlet } from "@angular/router";
import { FirestoreService } from '../../services/firestore-service';
import { NewsService } from '../../services/news.service';
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
private futureNewsService  = inject(NewsService)
private futureApiUrl = 'https://www.dati.lombardia.it/resource/uzy5-pr9h.json';   // dataset per Eventi culturali 199 elementi max (' Natura da vivere')



    @Input() currentPage: number = 1  ;   
    @Input() limit: number = 10 ;           // indica le newsPerPage     
    @Input() offset: number = (this.currentPage - 1) * this.limit;
     @Input() totalNews : number = 0;     // numero totale di news di default


    characters : any[] = []              // array per immagazzinare i dati per il carousel
    newsCard : futureNewsCard[] = []    // array per imagazzinare i dati per le news




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
    let offset = this.offset;

    this.futureNewsService.fetchData(this.futureApiUrl, this.limit, offset).subscribe({
      next: data =>{
        this.newsCard = data;
        this.totalNews = 200;         //impostato manualmente: il backend non da questa info, dataset 'Natura da vivere'
        this.cdr.detectChanges();
      },
      error: err =>{ 
        console.error('Errore:', err)
      }
    })
   
  }

  //evento click per il cambio pagina con le news nuove
onChangePage(pageNumber : number){
   if( pageNumber < 1) return     // controllo per valori negativi: se false ferma tutto
   
   this.currentPage =  pageNumber;
   this.offset =  (this.currentPage - 1) * this.limit;
   this.loadNews();
}


}
