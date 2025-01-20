import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0oIWwcNpp4r5wmGV1mh0E87RQq0fE7xs",
  authDomain: "shindan-app.firebaseapp.com",
  projectId: "shindan-app",
  storageBucket: "shindan-app.firebasestorage.app",
  messagingSenderId: "81307988326",
  appId: "1:81307988326:web:e3d01cb11f699a1b47d8a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
