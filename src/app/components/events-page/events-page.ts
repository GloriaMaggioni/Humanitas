import { Component, inject, Input, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { EventCard } from '../../models/eventCard.model';
import { NewsService } from '../../services/news.service';
import { Paginator } from '../paginator/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';




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
 @Input() limit : number = 20;
  offset : number = (this.currentPage - 1) * this.limit

// tab scelta categoria ---> da collegare al cambio delle card
selectedIndex: number = 0

  buttonSelected(index: number) {
    this.selectedIndex = index;
  }

  tabs = [
    { label: 'All' },
    { label: 'Art & Theater' },
    { label: 'Museum/ Exhibits' },
    { label: 'Readings' },
    { label: 'Plays' },
    { label: 'Book' },   // lecture
    { label: 'Multimedia' }
  ];

  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=6p0QSvZIxwHJjEGXdbtGTlu1zMpv2K9n';
  cards: EventCard[] = [];

 el : any = null;
 isOpen = false;

  ngOnInit(): void {
    this.getEvents()
   
  }
  //TODO: Da sistemare la chiamata API, i parametri limit e offset potrebbero non funzionare in questa chiamata

  getEvents(){
    this.callApi.fetchData(this.apiUrl, this.limit, this.offset).subscribe(
      {
        next: data =>{
          // console.log('Dati embedded', data._embedded)
          this.cards = data._embedded?.events || [];
           this.cdr.detectChanges();
          console.log('Primo evento', this.cards[0])
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