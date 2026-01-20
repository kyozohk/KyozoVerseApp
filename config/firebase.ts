import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn0nbZ1XQsxkiD9Cefj_FTGNpK3VhTpMY",
  authDomain: "kyozoverse.firebaseapp.com",
  projectId: "kyozoverse",
  storageBucket: "kyozoverse.firebasestorage.app",
  messagingSenderId: "1061297794599",
  appId: "1:1061297794599:web:23a0dd107dc36cff44a802",
  measurementId: "G-33S7RT90CJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
