import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzjDlVWfMoECIJAitsdtRB5hYrIBxw5q0",
  authDomain: "talaash-e1772.firebaseapp.com",
  projectId: "talaash-e1772",
  storageBucket: "talaash-e1772.appspot.com",
  messagingSenderId: "298237766669",
  appId: "1:298237766669:web:8e2a953319ebdc8aa97944",
  measurementId: "G-GNKDMS977Y"
};

// ✅ Always use the initialized app instance
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // already initialized app
}

const auth = getAuth(); // ✅ No need to pass app again

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
