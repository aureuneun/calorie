// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();

export const addUser = async (ctx) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...ctx,
      createdAt: Date.now(),
      timestamp: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const q = query(
  collection(db, "users"),
  // where("spend", "==", "high"),
  orderBy("createdAt", "desc")
  // startAfter(),
  // limit(5)
);

export const getUser = async () => await getDocs(q);

// const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//   console.log("===uid===");
//   console.log(user.uid);
//   console.log("===uid===");
//   snapshot.forEach((doc) => console.log(doc.data().uid));
// });
