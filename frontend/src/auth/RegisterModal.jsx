import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const API = "http://localhost:5000/api/users";

export default function RegisterModal({ onClose }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    username: "",
    nickname: "",
    birthYear: "",
    gender: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleRegister() {
    try {
      const fbUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await sendEmailVerification(fbUser.user);

      await axios.post(`${API}/register`, {
        ...form,
        uid: fbUser.user.uid,
      });

      setSuccessMsg("Kayıt başarılı! Email doğrulaması gönderildi.");
      setTimeout(onClose, 2000);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="
          relative w-[380px] p-6 rounded-xl shadow-xl
          bg-white text-slate-900 border border-slate-300
          dark:bg-[#1E293B] dark:text-white dark:border-gray-600
        "
      >
        {successMsg && (
          <div className="mb-3 bg-green-600/40 p-2 rounded-md text-center">
            {successMsg}
          </div>
        )}

        <button
          className="absolute right-3 top-3 text-slate-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>

        <div className="space-y-3">
          {[
            ["email", "Email"],
            ["password", "Şifre"],
            ["phone", "Telefon (+90...)"],
            ["username", "Ad Soyad"],
            ["nickname", "Nick"],
            ["birthYear", "Doğum Yılı"],
            ["gender", "Cinsiyet"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              type={name === "password" ? "password" : "text"}
              className="
                w-full px-3 py-2 rounded-lg outline-none
                bg-slate-100 border border-slate-300 text-slate-900
                focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
            />
          ))}
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-orange-600 hover:bg-orange-700 transition py-2 mt-4 rounded-lg font-semibold text-white"
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
