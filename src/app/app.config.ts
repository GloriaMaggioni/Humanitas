import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

 import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
//Inizializzazione del realtime database di firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {provideFirestore , getFirestore  } from '@angular/fire/firestore/lite';

// Dati configurazione database
const firebaseConfig = {
 apiKey: "AIzaSyDfiU_iONRiAqGo-7LW-yMHUrmnW--R73A",
  authDomain: "humanitas-14ec9.firebaseapp.com",
  projectId: "humanitas-14ec9",
  storageBucket: "humanitas-14ec9.firebasestorage.app",
  messagingSenderId: "366536092616",
  appId: "1:366536092616:web:832ec6510534ec2a2baefd",
  measurementId: "G-6XHSBXJ51B"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    //  provideClientHydration(withEventReplay()),   // vedere se bisogna lasciarlo poi attivo oppure no
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore( () => getFirestore())
  ]
};
