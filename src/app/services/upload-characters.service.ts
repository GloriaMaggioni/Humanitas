import { Injectable } from '@angular/core';
import { History_Characters, Future_Characters } from '../components/carousel/characters.model';
import {Database,set,ref} from '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UploadCharactersService {

  constructor(private db : Database) { }
  
  async uploadCharacters () {
    try {
       const charactersRef = ref(this.db, 'characters');

       await set(charactersRef, {
        history: History_Characters,
        future: Future_Characters
       }); 
       alert('Caricato tutto')
    }catch(error) {
      console.log('Errore', error)
    }
  }
}
