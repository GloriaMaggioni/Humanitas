import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-paginator',
  imports: [NgClass],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator implements OnInit, OnChanges  {


   @Input() currentPage : any;
   @Input() totalPages: number = 0;
   @Input() newsPerPage!: number;        // news/items per pagina
   @Input() totalNews: any;              // totali news/items

   @Output() changePage : EventEmitter<any> = new EventEmitter()     // evento per cambiare la pagina al click
  
    pages : number[] = [];    // array per immagazzinare il numero delle pagine 
    visibleBtn : number[] = []     // array per i btn visibili 





  ngOnInit(): void {
    this.paginatorLength();
    this.updateVisibleBtn()
  }

   // far vedere alcuni btn se la misura dello screen diminuisce
   @HostListener('window:resize')
   onResize(): void {
      this.updateVisibleBtn()
   }

   updateVisibleBtn(){                     //decide quali btn del paginator far vedere 
       this.visibleBtn = [1, this.currentPage, this.pages.length]
   }

  ngOnChanges(changes: SimpleChanges):void {            // controlla se totalNews e newsPerpage cambiano
    if(changes['totalNews'] || changes['newsPerPage']){         
       this.paginatorLength();
    }
    this.updateVisibleBtn();
  
  }

   // aumentare/diminuire la lunghezza del paginator dinamicamente e calcolo delle pagine totali
    paginatorLength(){ 
      if(this.totalNews > 0) {
      this.totalPages = Math.ceil(this.totalNews / this.newsPerPage)    // calcolo del totale delle pagine
      }       
      let start = 1;      
      let end = this.totalPages                                             // dove finisce il paginator
       this.pages = Array.from({length: end - start + 1}, (_, i) => i + 1)  // calcolo della lunghezza dell'array delle news
    }


    // evento click  (verso il padre) per cambio pagina
     changePageClick(pageNumber: number){    
       this.changePage.emit(pageNumber)       
     }

     // eventi btn per cambio pagina 
    prev(){
      this.changePage.emit(this.currentPage - 1)   
    }

    next(){  
      this.changePage.emit(this.currentPage + 1)      
    }
    
}
