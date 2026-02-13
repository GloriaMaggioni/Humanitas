import { Component, inject, Input, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { EventCard } from '../../models/eventCard.model';
import { NewsService } from '../../services/news.service';
import { Paginator } from '../paginator/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';




@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule,Paginator, DatePipe ],
  templateUrl: './events-page.html',
  styleUrl: './events-page.css'
})

export class EventsPage implements OnInit{
 private cdr = inject(ChangeDetectorRef);
 private  callApi = inject(NewsService);
 @Input() currentPage : number = 1;
 @Input() limit : number = 200;
  offset : number = (this.currentPage - 1) * this.limit
  
  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=6p0QSvZIxwHJjEGXdbtGTlu1zMpv2K9n';
  cards: EventCard[] = [];   // immagazzina i dati per gli events

selectedIndex: number = 0;        // tab scelta categoria 

 el : any = null;
 isOpen = false;



  ngOnInit(): void {
    this.getEvents(this.tabs?.[0]?.filter)
   
  }
 tabs = [         // array dei tabs
    { label: 'All' , filter: ''},
    // { label: ' Theater' , filter: '&classificationId=KnvZfZ7v7l1'},
    // { label: 'Museum/Cultural' , filter: '&classificationId=KnuZfZ7v7nE'},
    // // { label: 'Fine Art' , filter: '&classificationId=KnvZfZ7nl'},
    // { label: 'Lecture/Seminar' , filter: '&classificationName=lecture'},
    // { label: 'Spectacular' , filter: '&classificationId=KnvZfZ7v7la'},
    // {label: 'Arts & Theater', filter: '&classificationName=Arts & Theatre'}
// TODO: DA CONTROLLARE SE FUNZIONA(AGGIORNAMENTO SITO TICKETMASTER)
     { label: 'Art & Theater', filter: '?classificationName=Arts & Theatre' },
  { label: 'Museum/ Exhibits', filter: '?classificationName=Miscellaneous' },
  { label: 'Readings', filter: '?classificationName=Arts & Theatre' },  // stesso di Art & Theater
  { label: 'Plays', filter: '?classificationName=Theatre' },  // genre specifico
  { label: 'Book', filter: '?classificationName=Lectures' },   // genre specifico 
  { label: 'Multimedia', filter: '?classificationName=Film' }
  ];

// &classificationId=KZFzniwnSyZfZ7v7na
  buttonSelected(index: number) {    // indica quale tab è stato selezionato
    this.selectedIndex = index;
     let filter =this.tabs?.[index].filter
    this.getEvents(filter);
    console.log('filtro:', this.tabs?.[index].filter)
  }

 


  

  getEvents(filter: string){
    this.callApi.fetchData((this.apiUrl + filter), this.limit, this.offset).subscribe(
      {
        next: data =>{
          this.cards = data._embedded?.events || [];
           this.cdr.detectChanges();
          console.log('Primo evento', this.cards)
        },
        error: err => console.error('Errore nella chiamata:', err)
      }
    )
    
    
  }

  openDetails(index : number){
    this.el = this.cards[index];
    this.isOpen= true
  }

  closeDetails(){
    this.isOpen= false
     this.el = null;
  }

  
}

  

 




/*
 API PER LA RACCOLTA DEGLI EVENTI
 
1.dati Regione lombardia
2. TicketMater API ---> key API : 6p0QSvZIxwHJjEGXdbtGTlu1zMpv2K9n   baseUrl: https://app.ticketmaster.com/discovery/v2/events.json? , paramsQuery: apikey=TUA_CHIAVE&countryCode=IT&city=Milano&classificationName=arte


 https://app.ticketmaster.com/discovery/v2/events.json?apiKey=6p0QSvZIxwHJjEGXdbtGTlu1zMpv2K9n&countryCode:IT&city=Milano&classificationName=Art
 https://app.ticketmaster.com/discovery/v2/events.json?apikey=6p0QSvZIxwHJjEGXdbtGTlu1zMpv2K9n&countryCode=IT&region=Liguria  // funziona cambiado city con region
 eventi libri= usare classificationName= lecture
*/

/*
  PARAMETRI DI FILTRO RICERCA:
  keyword?: string,
  source?: string,
  startDateTime?: string,           // ISO 8601  2024-01-01T00:00:00Z   (anno-mese-giorno)
  endDateTime?: string,            // ISO 8601  2024-01-01T00:00:00Z     (anno-mese-giorno)
  size?: string,
  page?:  number | string,
  city?: string,
  countryCode?: string,            // ISO 2166-1 (IT, GB, US)
  stateCode?: string,              //CA, NY
  classificationName?: string,
  segmentName?: string,           
*/