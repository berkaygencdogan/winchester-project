// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6tEz5kv_ZZqkE8SHS9F27vB62c02bFas",
  authDomain: "winchester-project.firebaseapp.com",
  projectId: "winchester-project",
  storageBucket: "winchester-project.firebasestorage.app",
  messagingSenderId: "784074168501",
  appId: "1:784074168501:web:c40b6ac0c091512408c6fc",
  measurementId: "G-4S1RCLFJTR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// === RECAPTCHA KURULUMU ===
export function setupRecaptcha() {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  }

  return window.recaptchaVerifier;
}

// === OTP GÖNDER ===
export async function sendOTP(phone) {
  const verifier = setupRecaptcha();
  const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
  return confirmation;
}
