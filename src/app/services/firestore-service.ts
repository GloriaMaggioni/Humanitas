import { inject, Injectable, OnInit } from '@angular/core';
import { getDocs, collection,query, where } from '@angular/fire/firestore/lite';
 import { Firestore } from '@angular/fire/firestore/lite';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
   private firestore : Firestore =  inject (Firestore) 

 

  async getCharacters(tipo: 'history'| 'future', city?: string){
     const collectionName = tipo === 'history'  ? 'historyCharacters' : 'futureCharacters'
     const collectionRef = collection(this.firestore, collectionName)

     //chiamata a firestore in base se city c'è o no
     let charactersReturn;
     if(!city){
      charactersReturn = await getDocs(collectionRef);
     }else{
      const queryCall = query(collectionRef, where('city', '==', city));
      charactersReturn = await getDocs(queryCall)
     }

     //convertire i dati ricevuti in dati che possiamo usare
     return charactersReturn.docs.map((doc) => doc.data());
  }
  
}
