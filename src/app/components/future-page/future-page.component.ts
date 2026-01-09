import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { carousel } from '../../models/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import {  RouterOutlet } from "@angular/router";
import { FirestoreService } from '../../services/firestore-service';
import { NewsCityService } from '../../services/news-city.service';
import { futureNewsCard } from '../../models/futureNews.model';


@Component({
  selector: 'app-future-page',
  standalone:true,
  imports: [CarouselComponent, RouterOutlet],
  templateUrl: './future-page.component.html',
  styleUrl: './future-page.component.css'
})
export class FuturePageComponent implements OnInit{
  characters : any[] = []

  private firestoreService = inject(FirestoreService);
  private cdr = inject(ChangeDetectorRef)
  
   newsCard : futureNewsCard[] = []
   private futureNewsService  = inject(NewsCityService)
   currentPage = 1;

  ngOnInit(): void {
    this.prendiCharacters()
    this.loadNews()
    
  }

  // presi i dati dei personaggi per il carousel
  async prendiCharacters(){
    this.characters= await this.firestoreService.getCharacters('future');
    this.cdr.detectChanges();
  }
  
  loadNews(){
    const offset = (this.currentPage - 1) * 10;
    const limit = 10

    this.futureNewsService.getNewsEvents( limit,offset).subscribe({
      next: (data: futureNewsCard[]) => this.newsCard = data,
      error: err => console.error('Errore:', err)
    })
    console.log(this.newsCard)
  }


}