import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { carousel } from '../../carousel/carousel.model';


@Component({
  selector: 'app-milano',
  imports: [NgStyle],
  templateUrl: './milano.component.html',
  styleUrl: './milano.component.css'
})
export class MilanoComponent implements OnInit, OnDestroy {

  //CREATION CAROUSEL
 carousel :  carousel [] = [
    { 
      id: 1,
      img :'/assets/charactersImages/AdaNegri.jpg', 
      cit: '"Io scrivo per dare una voce a chi non ne ha"', 
      name: 'Ada Negri ', 
      bornDate: 1870,
      deathDate:  1945,
      profession: 'Poetessa e scrittrice, prima donna ammessa all’Accademia D’Italia',
      background: 'assets/charactersImages/AdaNegri.jpg'
    },
     {
      id: 2,
      img :'/assets/charactersImages/ClaraMaffei.jpg', 
      cit: '"Il dialogo e l\'arte sono la vera forza di un popolo"', 
      name: 'Clara Maffei ', 
      bornDate: 1814,
      deathDate:  1886,
      profession: 'Fondatrice del salotto letterario che ispirò il Risorgimento milanese',
      background: 'assets/charactersImages/ClaraMaffei.jpg'

    },
     { 
      id: 3,
      img :'/assets/charactersImages/CristinaTrivulzio.jpg', 
      cit: '"La libertà è un bene che non si riceve in dono, ma si conquista"', 
      name: 'Cristina Trivulzio', 
      bornDate: 1808,
      deathDate:  1871,
      profession: 'Patriota, giornalista e intellettuale',
      background: 'assets/charactersImages/CristinaTrivulzio.jpg'

    }
  ]

  //TRASFORM THE CAROUSEL INTO THE DINAMIC CAROUSEL
  currentId : number= 0;
  private intervalId : any;

  constructor(private cdr: ChangeDetectorRef){}


  get currentCharacter(): carousel{
   return this.carousel[this.currentId]
  }
  ngOnInit(): void{
    this.start()
  }
  start(): void {
    this.intervalId = setInterval( () => {
      this.nextImg();
      this.cdr.detectChanges()
    }, 3000)
  }

  stop(): void {
    if(this.intervalId){
      clearInterval(this.intervalId)
    }
  }

  nextImg(): void {
    if(this.currentId < this.carousel.length - 1){
      this.currentId++;
    } else {
      this.currentId = 0;
    }
  }


  prevImg(): void {
    if(this.currentId > 0){
      this.currentId--;
    } else {
      this.currentId = this.carousel.length -1;
    }
    this.cdr.detectChanges();
    console.log('Cambiato a:', this.currentCharacter.name);
  }

  ngOnDestroy(): void {
    this.stop()
  }



  // API REQUEST FOR NEWS LIST

}
