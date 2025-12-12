import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
//Inizializzazione del realtime database di firebase
 import {initializeApp} from 'firebase/app';

// Dati configurazione database
const firebaseConfig = {
  apiKey: "AIzaSyDfiU_iONRiAqGo-7LW-yMHUrmnW--R73A",
  authDomain: "humanitas-14ec9.firebaseapp.com",
  databaseURL: "https://humanitas-14ec9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "humanitas-14ec9",
  storageBucket: "humanitas-14ec9.firebasestorage.app",
  messagingSenderId: "366536092616",
  appId: "1:366536092616:web:832ec6510534ec2a2baefd",
  measurementId: "G-6XHSBXJ51B"
};

const app = initializeApp(firebaseConfig)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()), 
    provideHttpClient(withFetch()),
    // provideFirebaseApp( () => initializeApp(appConfig))
  ]
};
