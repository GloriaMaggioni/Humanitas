import { ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { HttpParams } from '@angular/common/http';
import { Places } from '../../models/places';
import {NgxMapLibreGLModule} from '@maplibre/ngx-maplibre-gl'
import { isPlatformBrowser } from '@angular/common';
 import { Marker, Map, config } from 'maplibre-gl';

@Component({
  selector: 'app-spazi-culturali',
  imports: [NgxMapLibreGLModule],
  templateUrl: './spazi-culturali.html',
  styleUrl: './spazi-culturali.css',
})
export class SpaziCulturali implements OnInit {
  private placesService = inject(NewsService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  private baseUrl : string = 'https://api.geoapify.com/v2/places?';
  private apiKey : string = 'apiKey=d1ad74eafd3e488bb42a007edabf7856';
  private categories : string = '&categories=entertainment.culture,entertainment.museum';
   private endpointApi : string = `${this.baseUrl}${this.apiKey}${this.categories}` ; 
   
  // latitudine e longitudine
  public latitude: number = 0;
  public longitude : number = 0;

  @Input() currentPage: number = 1  ;   
  @Input() limit: number = 30 ;           // indica le newsPerPage     
  @Input() offset: number = (this.currentPage - 1) * this.limit;
  @Input() totalNews : number = 0;     // numero totale di news di default
  @ViewChild('map')
  private mapContainer! : ElementRef<HTMLElement>

     place : Places = {features : []}   // model: oggetto con dentro features(array )
     mappa : Map | undefined      // mappa dei posti

ngOnInit(): void {
  this.getUserPosition()
  this.cdr.detectChanges()
  
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
          style:' https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=d1ad74eafd3e488bb42a007edabf7856',
          center: [this.longitude, this.latitude],
          zoom: 12
        }) 

        let param = new HttpParams()
          .set('filter', `circle:${this.longitude},${this.latitude},5000`);

          

        
        this.getPlaces(param);
        })
    }

    }
 
  }   ;




 // chiamata API
   getPlaces(param : HttpParams){
        this.placesService.fetchData((this.endpointApi + '&' + param),this.limit,this.offset).subscribe({
          next: (data : any) => {
            this.place = data;
            this.place.features.forEach( positionPLace =>{
               const marker = new Marker({color: 'green', anchor: 'bottom'})
               .setLngLat([positionPLace.properties.lon, positionPLace.properties.lat])
                .addTo(this.mappa!)
            })
           this.cdr.detectChanges()    
           
            console.log('Dati da getPlaces', this.place)
            console.log('primo luogo:', this.place.features[0].properties.lon, this.place.features[0].properties.lat);
          },
          error: (error : any) => {
            console.error('Errore nel calcolo posizione utente', error)
            alert('Errore nel calcolo posizione utente', )
          }
          
        })
      }

 

}


