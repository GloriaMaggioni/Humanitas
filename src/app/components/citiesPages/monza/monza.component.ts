import { Component, Input } from '@angular/core';
import { CarouselComponent } from "../../carousel/carousel.component";
import { carousel } from '../../carousel/carousel.model';
import { NgStyle } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-monza',
  imports: [CarouselComponent, ],
  templateUrl: './monza.component.html',
  styleUrl: './monza.component.css'
})
export class MonzaComponent {

  carousel :  carousel [] = [
    { 
      id: 1,
      img :'/assets/charactersImages/GiuseppeLonghi.jpg', 
      cit: '"L\' incisione è pittura tradotta in segno"', 
      name: 'Giuseppe Maria Longhi', 
      bornDate: 1766,
      deathDate:  1831,
      profession: 'Incisore, pittore e docente all\'Accademia di Brera',
      background: '/assets/charactersImages/GiuseppeLonghi.jpg'
    },
     { 
      id: 2,
      img :'/assets/charactersImages/PompeoMariani.jpg', 
      cit: '"Il paesaggio è parola di luce"', 
      name: 'Pompeo Mariani', 
      bornDate: 1857,
      deathDate:  1927,
      profession: 'Pittore',
      background: '/assets/charactersImages/PompeoMariani.jpg'

    },
     { 
      id: 3,
      img :'/assets/charactersImages/ElisabettaKeller.jpg', 
      cit: '"La sola cosa peggiore di non avere la vista è di non avere visione. "', 
      name: 'Elisabetta Keller', 
      bornDate: 1891,
      deathDate:  1969,
      profession: 'Pittrice e ritrattista',
      background: '/assets/charactersImages/ElisabettaKeller.jpg'

    }
  ]
  
}
