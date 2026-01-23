import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsCityService } from '../../services/news-city.service';


@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator implements OnInit  {
/*

  @Output() changePage :  EventEmitter<any> = new EventEmitter()
 



     //metodo che emette il numero della pagina con event emitter

     changePageClick(pageNumber: number){
      this.changePage.emit(pageNumber)
     }

    prev(){
      this.changePage.emit(this.currentPage - 1)   
      console.log('paginacorrente', this.currentPage)
       

    }
    next(){
      this.changePage.emit(this.currentPage + 1)     
      console.log('paginacorrente', this.currentPage)
    
    
    }
  
  
   */
  

    /*
      ho bisogno: (segnare tutti come @Input())
       1. currentPage  ---> corrisponde offset
       2. totalNews 
       3. newsPerPage ---> corrisponde al  limit
       4. totalPages ---> calcolo start e end  ---> salso in array pages(immagazzina i dati proveniente dalla chiama api)
    */

   @Input() currentPage : number = 1;
   @Input() totalPages: number = 0;
   @Input() totalNews!: number;
   @Input() newsPerPage!: number;
   @Output() changePage : EventEmitter<any> = new EventEmitter()     // evento per cambiare la pagina al click
  
    pages : number[] = []    // array per immagazzinare le news dalla chiamata API




  ngOnInit(): void {
   if(this.totalNews > 0) {
      this.totalPages = Math.ceil(this.totalNews / this.newsPerPage)    // calcolo del totale delle pagine
   }
    this.paginatorLength()
    
    console.log('questo è pages in ngOnInit', this.pages)
        console.log('questo è pages in paginatorRange', this.paginatorLength())

  }

   // aumentare/diminuire la lunghezza del paginator dinamicamente
    paginatorLength(){        
      let start = 1;                                                         // da dove parte il paginator
      let end = this.totalPages                                             // dove finisce il paginator
       this.pages = Array.from({length: end - start + 1}, (_, i) => i + 1)  // calcolo della lunghezza dell'array delle news
       console.log('pages:', this.pages)
    }

    
}
