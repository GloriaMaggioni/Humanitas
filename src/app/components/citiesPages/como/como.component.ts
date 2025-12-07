import { Component } from '@angular/core';
import { carousel } from '../../carousel/carousel.model';
import { CarouselComponent } from '../../carousel/carousel.component';

@Component({
  selector: 'app-como',
  imports: [CarouselComponent],
  templateUrl: './como.component.html',
  styleUrl: './como.component.css'
})
export class ComoComponent {
   carousel :  carousel [] = [
      { 
        id: 1,
        img :'/assets/charactersImages/AntonioSantElia.jpg', 
        cit: '"Le case dureranno meno di noi.Ogni generazione dovrà fabbricarsi la sua città"', 
        name: 'Antonio Sant\'Eelia ', 
        bornDate: 1888,
        deathDate:  1916,
        profession: 'Architetto futurista',
        background: '/assets/charactersImages/AntonioSantElia.jpg'
      },
       {
        id: 2,
        img :'/assets/charactersImages/GaetanoPreviati.jpg', 
        cit: '"Per dipingere una figura non bisogna farla: bisogna farne l\'atmosfera"', 
        name: 'Gaetano Previati ', 
        bornDate: 1852,
        deathDate:  1920,
        profession: 'Pittore',
        background: '/assets/charactersImages/GaetanoPreviati.jpg'
  
      },
       { 
        id: 3,
        img :'/assets/charactersImages/GiuseppeTerragni.jpg', 
        cit: '"Tradizione è nello spirito,non nella forma"', 
        name: 'Giuseppe Terragni', 
        bornDate: 1904,
        deathDate:  1943,
        profession: 'Architetto,massimo esponente del razionalismo italiano',
        background: '/assets/charactersImages/GiuseppeTerragni.jpg'
  
      },
       
    ]

}
