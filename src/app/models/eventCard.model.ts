// INTERFACCIA PER LA EVENT CARD CON I PARAMETRI DA PRENDERE

import { Interface } from "readline"

export interface Card { 
  name?: string,
  info?: string,        
  classifications? : {
     genre?: {
       name?: string,
     },
     subgenre?: {
       name?: string
     },
     type?: {
      name?: string
     }
  },
  images?: {
    ratio?: string,
    url?: string
  },
  _embedded? : {
     venues?: 
      Array<{
              name?: string,
              city?: { name: string };
              url?: string

      } >
     

  }
 

  

}







