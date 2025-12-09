import axios from "axios";
import { auth } from "../firebase/firebase";
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";

const API = "http://localhost:5000/api/users";

export async function verifyOTP(verificationId, code) {
  const credential = PhoneAuthProvider.credential(verificationId, code);

  const res = await signInWithCredential(auth, credential);
  const idToken = await res.user.getIdToken();

  // Backend’e gönder
  const r = await axios.post(`${API}/phone-login`, { idToken });

  // JWT kaydet
  localStorage.setItem("token", r.data.token);
  localStorage.setItem("user", JSON.stringify(r.data.user));

  return r.data;
}
