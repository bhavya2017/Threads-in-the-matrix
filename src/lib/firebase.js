import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKiK5Ls_ccOyjboTXgrOCfmnoigPQkXLU",
  authDomain: "threads-in-the-matrix.firebaseapp.com",
  projectId: "threads-in-the-matrix",
  storageBucket: "threads-in-the-matrix.appspot.com",
  messagingSenderId: "1018314631419",
  appId: "1:1018314631419:web:3de1dcef5599a4602f685e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
