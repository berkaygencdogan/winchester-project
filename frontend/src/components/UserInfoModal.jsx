import { useState } from "react";
import { createProfile } from "../api/auth";

export default function UserInfoModal({ user, onClose }) {
  const [form, setForm] = useState({
    username: "",
    favoriteTeam: "",
    avatarURL: "",
    age: "",
    gender: "",
    bio: "",
  });

  const submit = async () => {
    const payload = { ...form, uid: user.uid };

    const res = await createProfile(payload);

    if (res.data.success) {
      alert("Profil oluşturuldu!");
      onClose();
    } else {
      alert("Hata: " + res.data.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div
        className="
  p-6 rounded-xl w-[400px]
  bg-white text-slate-900
  dark:bg-[#1E293B] dark:text-white
"
      >
        <h2 className="text-xl mb-4">Profil Bilgileri</h2>

        {[
          ["username", "Kullanıcı Adı"],
          ["favoriteTeam", "Favori Takım"],
          ["avatarURL", "Avatar URL (opsiyonel)"],
          ["age", "Yaş"],
          ["gender", "Cinsiyet"],
          ["bio", "Bio (opsiyonel)"],
        ].map(([key, label]) => (
          <input
            key={key}
            placeholder={label}
            className="
  w-full p-2 rounded mb-3
  bg-slate-100 text-slate-900 border border-slate-300
  dark:bg-[#0F172A] dark:text-white dark:border-gray-700
"
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}

        <button
          onClick={submit}
          className="bg-green-600 w-full py-2 rounded mt-2"
        >
          Kaydet
        </button>

        <button
          onClick={onClose}
          className="text-slate-500 dark:text-gray-300 text-sm mt-3 underline w-full"
        >
          İptal
        </button>
      </div>
    </div>
  );
}
