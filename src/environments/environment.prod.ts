import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBOL_j-rw_fhe4WvhIjLPhX6f0pZZ3LmJM",
    authDomain: "socialmedia-a483d.firebaseapp.com",
    projectId: "socialmedia-a483d",
    storageBucket: "socialmedia-a483d.appspot.com",
    messagingSenderId: "588462194954",
    appId: "1:588462194954:web:24583d40c529cf2a927af3",
    measurementId: "G-NBX1DSYLC8"
  }
};

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);