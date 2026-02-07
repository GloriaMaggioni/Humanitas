import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { carousel } from '../../models/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import { FirestoreService } from '../../services/firestore-service';
import { Paginator } from "../paginator/paginator";
import { CultureItems } from '../../models/culture-items';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-history-page',
  standalone:true,
  imports: [RouterOutlet, CarouselComponent, Paginator],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit{
  
   private firestoreService =  inject(FirestoreService);
   private cdr = inject(ChangeDetectorRef);
   private historyService = inject(NewsService)
   private historyApiUrl = 'https://www.dati.lombardia.it/resource/4mr7-hfsh.json';  // url del dataset
   @Input() limit : number = 20;           // items per page
   @Input() currentPage : number = 1
   offset :  number = (this.currentPage - 1) * this.limit;       // punto di inizio
   @Input() totalItems : number = 0;                        //items totali

    characters: any[]=[];
    itemsCard : CultureItems[] = [];           // immagazzina i dati da visualizzare nelle card

    el: any = null;
    isOpen = false;


 

  ngOnInit(): void {
       this.prendiCharacters();
       this.getCultureItems();

  }
   async prendiCharacters(){
   this.characters = await this.firestoreService.getCharacters('history');
   this.cdr.detectChanges()
 
   
  }
  
   // Chiamata API
   getCultureItems(){
    
    this.historyService.fetchData(this.historyApiUrl, this.limit, this.offset).subscribe({
       next: data =>{
         this.itemsCard = data;
          this.totalItems = 1800;          // impostato manualmente sul numero tot di items indicato sul sito dati.lombardia dataset 'Beni Culturali Bella Lombardia'
         this.cdr.detectChanges();
       },
       error : err =>{
        console.error('Errore nel recupero dati dalla API:', err)
       }
    })
   }
   
//  pagina dei dettagli completi degli items
 itemDetails(index : number){             
   this.el = this.itemsCard[index];
   this.isOpen = true;
 }

 chiudi(){    // evento click per chiudere la pagina dei dettagli
  this.isOpen= false;
  this.el= null
 }
  


 onChangePage(pageNumber : number){
   if( pageNumber < 1) return     // controllo per valori negativi: se false ferma tutto
   
   this.currentPage =  pageNumber;
   this.offset =  (this.currentPage - 1) * this.limit;
   this.getCultureItems();
}
}


