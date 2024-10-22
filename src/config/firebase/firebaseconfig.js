import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6xobFeMtElG3xtCuO028fZoEPjOz_Zro",
  authDomain: "react-ecommerce-app-detail.firebaseapp.com",
  projectId: "react-ecommerce-app-detail",
  storageBucket: "react-ecommerce-app-detail.appspot.com",
  messagingSenderId: "950142404283",
  appId: "1:950142404283:web:2b8f6596270433da8b8b9e",
  measurementId: "G-Y8P0YE4ZPJ",
};

// Initialize Cloud Firestore and get a reference to the service
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
