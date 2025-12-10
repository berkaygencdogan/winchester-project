import { useState, useContext } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const API = "http://localhost:5000/api/users";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleLogin() {
    try {
      const fbUser = await signInWithEmailAndPassword(auth, email, password);

      if (!fbUser.user.emailVerified) {
        setError("Email doğrulanmamış. Lütfen emailinizi doğrulayın.");
        setShowResend(true);
        return;
      }

      const idToken = await fbUser.user.getIdToken();

      // 🔥 Firestore’daki emailVerified alanını güncelle
      await axios.post(`${API}/refresh-email-status`, { idToken });

      // 🔥 Backend giriş
      const res = await axios.post(`${API}/login`, { idToken });

      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  async function resendVerification() {
    try {
      setSending(true);

      const fbUser = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(fbUser.user);

      setError("Doğrulama emaili tekrar gönderildi!");
    } catch (err) {
      setError("Tekrar gönderilemedi: " + err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] p-6 rounded-xl w-[360px] relative text-white shadow-xl border border-gray-600">
        {error && (
          <div className="bg-red-600/40 p-2 rounded-md text-center mb-3">
            {error}

            {showResend && (
              <button
                onClick={resendVerification}
                className="ml-2 underline text-orange-300"
              >
                {sending ? "Gönderiliyor..." : "Tekrar Gönder"}
              </button>
            )}
          </div>
        )}

        {/* X BUTTON */}
        <button
          className="absolute right-3 top-3 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>

        <input
          className="w-full px-3 py-2 mb-3 rounded-lg bg-[#0F172A] border border-gray-700 focus:border-orange-500 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-3 py-2 mb-4 rounded-lg bg-[#0F172A] border border-gray-700 focus:border-orange-500 outline-none"
          placeholder="Şifre"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-600 hover:bg-orange-700 transition py-2 rounded-lg font-semibold"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
