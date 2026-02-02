import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { carousel } from '../../models/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import { FirestoreService } from '../../services/firestore-service';
import { Paginator } from "../paginator/paginator";
import { CultureItems } from '../../models/culture-items';
import { NewsCityService } from '../../services/news-city.service';

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
   private historyService = inject(NewsCityService)
   private historyApiUrl = 'https://www.dati.lombardia.it/resource/4mr7-hfsh.json';
   @Input() limit : number = 20;
   @Input() currentPage : number = 1
   offset :  number = (this.currentPage - 1) * this.limit

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
  

}


