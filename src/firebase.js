import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBug_EQX14McoqB9Rl9rlzHpX-nyn9hp0M",
  authDomain: "noteboost.firebaseapp.com",
  projectId: "noteboost",
  appId: "1:772262781875:web:e8082522f428b2e19f21c6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };