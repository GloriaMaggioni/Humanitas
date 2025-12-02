import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-milano',
  imports: [],
  templateUrl: './milano.component.html',
  styleUrl: './milano.component.css'
})
export class MilanoComponent {


  carousel = [
    { img :'/assets/charactersImages/AdaNegri.jpg', 
      cit: '"Io scrivo per dare una voce a chi non ne ha"', 
      name: 'Ada Negri ', 
      bornDate: ' (1870',
      deathDate: '- 1945)',
      profession: 'Poetessa e scrittrice, prima donna ammessa all’Accademia D’Italia'
    },
     { img :'/assets/charactersImages/ClaraMattei.jpg', 
      cit: '"Io scrivo per dare una voce a chi non ne ha"', 
      name: 'Clara Mattei ', 
      bornDate: ' (1870',
      deathDate: '- 1945)',
      profession: 'Poetessa e scrittrice, prima donna ammessa all’Accademia D’Italia'
    },
     { img :'/assets/charactersImages/CristinaTrivulzio.jpg', 
      cit: '"Io scrivo per dare una voce a chi non ne ha"', 
      name: 'Cristina Trivulzio', 
      bornDate: ' (1870',
      deathDate: '- 1945)',
      profession: 'Poetessa e scrittrice, prima donna ammessa all’Accademia D’Italia'
    }
  ]

}
