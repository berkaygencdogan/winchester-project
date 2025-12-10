import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
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

// Şifresiz giriş link gönder
export function sendMagicLink(email) {
  const actionCodeSettings = {
    url: "http://localhost:5173/login-finish",
    handleCodeInApp: true,
  };

  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export function completeMagicLinkLogin(email, url) {
  return signInWithEmailLink(auth, email, url);
}
