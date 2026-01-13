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
  characters : any[] = []

  private firestoreService = inject(FirestoreService);
  private cdr = inject(ChangeDetectorRef)
  
   newsCard : futureNewsCard[] = []
   private futureNewsService  = inject(NewsCityService)
   @Input() currentPage: number = 1;
    limit: number = 10; // numero di news da visualizzare per pagina






  ngOnInit(): void {
    this.prendiCharacters();
     this.loadNews(); 
   
  }

  // presi i dati dei personaggi per il carousel
  async prendiCharacters(){
    this.characters= await this.firestoreService.getCharacters('future');
    this.cdr.detectChanges();
  }


  loadNews(){
    const offset = (this.currentPage - 1) * this.limit;

    this.futureNewsService.getNewsEvents(this.limit,offset).subscribe({
      next: data =>{
        this.newsCard = data;
      },
      error: err =>{ 
        console.error('Errore:', err)
      }
    })
     console.log(this.newsCard)
  }

  //evento click per il cambio pagina con le news nuove
onChangePage(pageNumber : number){
  this.currentPage = pageNumber;
  this.loadNews()
}
 

}
