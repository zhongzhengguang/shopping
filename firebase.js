import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYgqu-knedkYxJ7Oz8EaZ2-AO7O3wdIgM",
  authDomain: "shop-website-e1d2f.firebaseapp.com",
  projectId: "shop-website-e1d2f",
  storageBucket: "shop-website-e1d2f.appspot.com",
  messagingSenderId: "416038728942",
  appId: "1:416038728942:web:d3ad32db8e53763ce52fff",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
