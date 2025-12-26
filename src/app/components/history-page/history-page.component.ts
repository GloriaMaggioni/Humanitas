import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { carousel } from '../carousel/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import { FirestoreService } from '../../services/firestore-service';

@Component({
  selector: 'app-history-page',
  standalone:true,
  imports: [RouterLink, RouterOutlet, CarouselComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit{
   characters: any[]=[]
   private firestoreService =  inject(FirestoreService)
   private cdr = inject(ChangeDetectorRef)


 

  ngOnInit(): void {
       this.prendiCharacters()
  }
   async prendiCharacters(){
   this.characters = await this.firestoreService.getCharacters('history');
   this.cdr.detectChanges()
 
   
  }
  
   
   


  cityCard = [
    {
      link: '/milano',
      img: '/assets/images/Milano.jpg',
      label:'Milano'
    },
     {
      link: '/monza',
      img: '/assets/images/Monza.jpg',
      label:'Monza'

    },
     {
      link: '/lecco',
      img: '/assets/images/Lecco.jpg',
      label:'Lecco'
    },
     {
      link: '/como',
      img: '/assets/images/Como.jpg',
      label:'Como'
    },
   
  ];


  

}


