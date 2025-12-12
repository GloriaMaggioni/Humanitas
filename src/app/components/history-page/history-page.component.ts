import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { carousel } from '../carousel/carousel.model';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-history-page',
  imports: [RouterLink, RouterOutlet, CarouselComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {

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

  carousel: carousel [] = [
     { 
      img :'/assets/charactersImages/LeonardoDaVinci2.jpg', 
      cit: '"Il saper vedere è il vero motore del mondo "', 
      name: 'Leonardo Da Vinci', 
      bornDate: 1452,
      deathDate:  1519,
      profession: 'Scienziato, inventore artista italiano',
      background: '/assets/charactersImages/LeonardoDaVinci2.jpg'

    }
  ]
  

}
