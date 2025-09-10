import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo1G04uYLn3JNJPWmg0p0V3AvAa3nD-Ww",
  authDomain: "tel-man.firebaseapp.com",
  databaseURL: "https://tel-man-default-rtdb.firebaseio.com",
  projectId: "tel-man",
  storageBucket: "tel-man.appspot.com",
  messagingSenderId: "1075138049672",
  appId: "1:1075138049672:web:1e6fbb21f0489ece91513d"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBlPwBHMjUlJlJxBqw1M1CVldgusTpNagI",
//   authDomain: "hotel-register.firebaseapp.com",
//   projectId: "hotel-register",
//   storageBucket: "hotel-register.firebasestorage.app",
//   messagingSenderId: "777811668656",
//   appId: "1:777811668656:web:78437686f85d726c6d1575"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { db, auth };
