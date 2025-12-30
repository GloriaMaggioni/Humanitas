import { Component, input, Input } from '@angular/core';
import { carousel } from '../../models/carousel.model';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'app-carousel',
  imports: [NgStyle],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
   
 @Input()  carousel : carousel[] = []
  //TRASFORM THE CAROUSEL INTO THE DINAMIC CAROUSEL
  currentId : number= 0;
  private intervalId : any;

  constructor(private cdr: ChangeDetectorRef){}


//restituisce l'array dei dati 
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



 

}

