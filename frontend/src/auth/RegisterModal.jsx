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
      // 1) Firebase user oluştur
      const fbUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // 2) Doğrulama maili gönder
      await sendEmailVerification(fbUser.user);

      // 3) Backend’e kaydet (OTOMATİK LOGIN YOK!)
      await axios.post(`${API}/register`, {
        ...form,
        uid: fbUser.user.uid,
      });

      setSuccessMsg("Kayıt başarılı! Email doğrulaması gönderildi.");

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] p-6 rounded-xl w-[380px] relative text-white shadow-xl border border-gray-600">
        {successMsg && (
          <div className="mb-3 bg-green-600/40 text-white p-2 rounded-md text-center">
            {successMsg}
          </div>
        )}

        <button
          className="absolute right-3 top-3 text-gray-300 hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>

        <div className="space-y-3">
          <input
            className="input-auth"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="password"
            type="password"
            placeholder="Şifre"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="phone"
            placeholder="Telefon (+90...)"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="username"
            placeholder="Ad Soyad"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="nickname"
            placeholder="Nick"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="birthYear"
            placeholder="Doğum Yılı"
            onChange={handleChange}
          />
          <input
            className="input-auth"
            name="gender"
            placeholder="Cinsiyet"
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full bg-orange-600 hover:bg-orange-700 transition py-2 mt-4 rounded-lg font-semibold"
          onClick={handleRegister}
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
