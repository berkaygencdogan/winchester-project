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
      await axios.post(`${API}/refresh-email-status`, { idToken });

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
      <div
        className="
          relative w-[360px] p-6 rounded-xl shadow-xl
          bg-white text-slate-900 border border-slate-300
          dark:bg-[#1E293B] dark:text-white dark:border-gray-600
        "
      >
        {error && (
          <div className="bg-red-600/40 p-2 rounded-md text-center mb-3">
            {error}
            {showResend && (
              <button
                onClick={resendVerification}
                className="ml-2 underline text-orange-400"
              >
                {sending ? "Gönderiliyor..." : "Tekrar Gönder"}
              </button>
            )}
          </div>
        )}

        <button
          className="absolute right-3 top-3 text-slate-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>

        <input
          className="
            w-full px-3 py-2 mb-3 rounded-lg outline-none
            bg-slate-100 border border-slate-300 text-slate-900
            focus:border-orange-500
            dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
          "
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="
            w-full px-3 py-2 mb-4 rounded-lg outline-none
            bg-slate-100 border border-slate-300 text-slate-900
            focus:border-orange-500
            dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
          "
          placeholder="Şifre"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-600 hover:bg-orange-700 transition py-2 rounded-lg font-semibold text-white"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
