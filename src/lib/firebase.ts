import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDkf7eV20cHGQtLamtiE5vT9G4QVI0PZpU',
  authDomain: 'empire-granit.firebaseapp.com',
  projectId: 'empire-granit',
  storageBucket: 'empire-granit.firebasestorage.app',
  messagingSenderId: '72227724944',
  appId: '1:72227724944:web:c0e17074ecc741d5bd0215',
  measurementId: 'G-QQ3ZBNLYSB'
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
