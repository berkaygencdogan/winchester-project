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
const auth = getAuth(app);

// Recaptcha başlat
export function setupRecaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    },
    auth
  );
}

// Telefon doğrulama
export async function sendCode(phone) {
  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  return signInWithPhoneNumber(auth, phone, appVerifier);
}

// Kodu doğrula
export async function verifyCode(confirmation, code) {
  const result = await confirmation.confirm(code);
  return result.user;
}
