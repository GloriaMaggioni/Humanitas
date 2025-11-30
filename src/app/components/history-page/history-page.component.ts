import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-history-page',
  imports: [RouterLink, RouterOutlet],
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
   
  ]
  

}
