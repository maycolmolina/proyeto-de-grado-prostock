import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

//importaciones de firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideMarkdown } from 'ngx-markdown';

const firebaseConfig = {
  apiKey: "AIzaSyC359FAUmxlTk70EYrdRcSaRQQTCsi2K00",
  authDomain: "prostock2025-da706.firebaseapp.com",
  projectId: "prostock2025-da706",
  storageBucket: "prostock2025-da706.firebasestorage.app",
  messagingSenderId: "770938836957",
  appId: "1:770938836957:web:49f5c8213c6bc5ac960834",
  measurementId: "G-N7EW0QJYVK"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideMarkdown(),
    // proveedores de firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()) // <-- Realtime Database

  ]
};
