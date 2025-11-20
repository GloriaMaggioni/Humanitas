import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from "@angular/common";
import { Interface } from 'node:readline';
import { EventCardService } from '../../services/event-card.service';
 export interface Card {
    image: File,
    title: string,
    date: number,
    luogo: string,
    description: string

  };
@Component({
  selector: 'app-events-page',
  imports: [MatButtonModule, MatSidenavModule, ],
  templateUrl: './events-page.html',
  styleUrl: './events-page.css'
})

export class EventsPage {

selectedIndex: number = 0
card: Card[] = [];
constructor(private eventCard : EventCardService){}

  buttonSelected(index: number) {
    this.selectedIndex = index;
  }

  tabs = [
    { label: 'All' },
    { label: 'Art' },
    { label: 'Tech' },
    { label: 'Business' },
    { label: 'Social' },
    { label: 'Book' },
    { label: 'Economy' }
  ]
  cardData() {
     this.eventCard.getCards().subscribe({
     next: (data: any) =>{this.card = data}
 })
 error: (err: any) => {console.log('errore:', err)}

  }

 
}



/*
ELENCO API PER LA RACCOLTA DEGLI EVENTI

1.OpenAgenda
2.OpenWeb Ninja --> richiede un Api Key , max 100 request/month (?)
3.Italia/Regional OpenData Apis (non ho capito come funziona e se funziona: RICONTROLLARE)
4.Google Events via SearpApi (DA VERIFICARE)
*/