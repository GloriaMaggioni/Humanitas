// INTERFACCIA PER LA EVENT CARD CON I PARAMETRI DA PRENDERE

import { Interface } from 'readline';

export interface EventCard {
  id?: string; // ? vedere se serve
  name?: string;
  type?: string; // classe (es. evento, upSell, corso ,attrazione(es.sport),etc..)
  url?: string; //vedere se serve
  info?: string;
  classifications?: Array<{     // tipo di evento(es. sport -Basket-NBA )
    name?: string;                  // sport
    segment?: {name?: string}   // categoria principale
    genre?: { name?: string };      // Basket
    subgenre?: { name?: string };   // NBA
  }>;
  images?: Array<{
    url?: string;
  }>;
  dates?: {     // data evento
    start?: {
      dateTime?: string;
      localDate?: string;
      localTime?: string;
    };
    status?: {
      code?: string; //onsale
    };
    timezone?: string; //America/Phoenix
  };
  promoters?: Array<{     // organizzatore dell'evento
      name?: string;
      description?: string;
  }>;
   products?: Array<{
      // prodotti(es tickets)
      classifications?: {
        id?: string;
        name?: string;
        url?: string;
        type?: string; // ? vedere se serve
      };
  }>;
  _embedded?: {
    venues?: Array<{
      name?: string;
      city?: { name?: string };
      url?: string;
      state?: { name?: string; stateCode?: string };
      country?: { countryCode?: string; name?: string };
      images?: { url?: string };
      location?: { latitudine?: string; longitudine?: string }; // ? vedere se serve
      postalCode?: string;
      timeZone?: string;
    }>;
    attractions?: Array<{     // artista/performer
      name?: string;
      url?: string;
      images?: string; // ? vedere se serve
      classifications?: {
        name?: string;
        segment?: { name?: string };      // tipologia evento (es. sport) //SPORT
        subGenre?: { name?: string };    //NBA
        url?: string;
      };
      externalLinks?: Array<{    // ? vedere se alla fine inserirli o no da qualcke parte
        facebook?: Array<{ url?: string }>;
        homepage?: Array<{ url?: string }>;
        instagram?: Array<{ url?: string }>;
        twitter?: Array<{ url?: string }>;
        wiki?: Array<{ url?: string }>;
      }>;
    }>;
   
  };

}
