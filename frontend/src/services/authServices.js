// frontend/src/services/authService.js

import axios from "axios";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { completeMagicLinkLogin } from "../firebase/firebase";

const API = "http://localhost:5000/api/users";

/* ---------------------------------------------
   EMAIL + PASSWORD LOGIN
--------------------------------------------- */
export async function loginEmailPassword(email, password) {
  const firebaseRes = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await firebaseRes.user.getIdToken();

  const r = await axios.post(`${API}/login`, { idToken });

  localStorage.setItem("token", r.data.token);
  localStorage.setItem("user", JSON.stringify(r.data.user));

  return r.data;
}

/* ---------------------------------------------
   EMAIL LINK (PASSWORDLESS) - TAMAMLAMA
--------------------------------------------- */
export async function finishMagicLogin(email, url) {
  const firebaseRes = await completeMagicLinkLogin(email, url);
  const idToken = await firebaseRes.user.getIdToken();

  const r = await axios.post(`${API}/email-link-login`, { idToken });

  localStorage.setItem("token", r.data.token);
  localStorage.setItem("user", JSON.stringify(r.data.user));

  return r.data;
}
