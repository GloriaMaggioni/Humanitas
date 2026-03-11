import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { HttpParams } from '@angular/common/http';
import { Places } from '../../models/places';
import { isPlatformBrowser } from '@angular/common';
import { Map, MapStyle, Marker, config, Popup } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css'; 

@Component({
  selector: 'app-spazi-culturali',
  imports: [],
  templateUrl: './spazi-culturali.html',
  styleUrl: './spazi-culturali.css',
})
export class SpaziCulturali implements OnInit, AfterViewInit {
  private placesService = inject(NewsService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  private baseUrl : string = 'https://api.geoapify.com/v2/places?';
  private apiKey : string = 'apiKey=d1ad74eafd3e488bb42a007edabf7856';
  private categories : string = '&categories=entertainment.culture,entertainment.museum,entertainment.culture.arts_centre';
   private endpointApi : string = `${this.baseUrl}${this.apiKey}${this.categories}` ; 
   
  // latitudine e longitudine
  public latitude: number = 0;
  public longitude : number = 0;

  @Input() currentPage: number = 1  ;   
  @Input() limit: number = 200 ;           // indica i postiPerpage   
  @Input() offset: number = (this.currentPage - 1) * this.limit;
  @Input() totalPlace: number = 0;     // numero totale di place di default
  @ViewChild('map')
  private mapContainer! : ElementRef<HTMLElement>

     place : Places = {features : []}   // model: oggetto con dentro features(array )
     mappa : Map | undefined      // mappa dei posti
     marker : Marker | undefined;   // marker della mappa

  // places detail popup model
  

ngOnInit(): void {
  this.cdr.detectChanges()
  
}
ngAfterViewInit(): void {
    this.getUserPosition()

}

  

  // calcolo della position dell'user


  getUserPosition(){
    if(isPlatformBrowser(this.platformId)) {                        //  controllo: se l'operazione è nel browser  carica tutto, altrimenti no
         if(typeof navigator !== 'undefined' && navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position : GeolocationPosition) => {
         if(position){
           this.latitude = position.coords.latitude;
           this.longitude = position.coords.longitude;
         }else {
             alert("Posizione dell'utente non disponibile");
         }

         this.mappa =  new Map({
          container: this.mapContainer.nativeElement,
          style:'https://api.maptiler.com/maps/streets-v4/style.json?key=rYJiuA5nlKE7NmCUClBp',
          center: [this.longitude, this.latitude],
          zoom: 8
        }) 

        let param = new HttpParams()
          .set('filter', `circle:${this.longitude},${this.latitude},50000`);

          
            this.mappa.on('load', () =>{
              console.log('mappa caricata!')
                this.getPlaces(param);

            })
        
        })
    }

    }
 
  }   ;




 // chiamata API
   getPlaces(param : HttpParams){
        this.placesService.fetchData((this.endpointApi + '&' + param),this.limit,this.offset).subscribe({
          next: (data : any) => {
            this.place = data;
            this.totalPlace = 100;
            this.place.features.forEach( positionPlace =>{
              this.marker = new Marker({color: 'green', anchor: 'bottom', draggable: false})
                .setLngLat([positionPlace.properties.lon, positionPlace.properties.lat])
                .setPopup(this.placesDetails(positionPlace))
                .addTo(this.mappa!);
            })
           
           this.cdr.detectChanges()    
           
            console.log('Dati da getPlaces', this.place)
          },
          error: (error : any) => {
            alert('Errore nel calcolo posizione utente', )
          }
          
        })
      }


 // metodo popup per vedere i dettagli di ogni posto
 placesDetails(positionPlace: any) : Popup{
  const details = new Popup()
    .setHTML(
     
         ` 
           <div class=" rounded-md  p-2">
              <h2 class=" font-bold"> ${positionPlace.properties.name}</h2>
              <p>${positionPlace.properties.address_line2}</p>
              <p>${positionPlace.properties.opening_hours}</p>
              <p>${positionPlace.properties.contact?.phone}</p>
               <p class="w-full "><a href="${positionPlace.properties.website}" target="_blank">${positionPlace.properties.website}</a></p>

           </div>
                     
         `
  )
  return details
 }

           
    }