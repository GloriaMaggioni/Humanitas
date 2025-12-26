import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { carousel } from '../carousel/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { FirestoreService } from '../../services/firestore-service';


@Component({
  selector: 'app-future-page',
  standalone:true,
  imports: [CarouselComponent, RouterOutlet, RouterLink],
  templateUrl: './future-page.component.html',
  styleUrl: './future-page.component.css'
})
export class FuturePageComponent implements OnInit{
  characters : any[] = []
  private firestoreService = inject(FirestoreService);
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.prendiCharacters()
    
  }
  async prendiCharacters(){
    this.characters= await this.firestoreService.getCharacters('future');
    this.cdr.detectChanges();
    console.log(this.characters)
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
