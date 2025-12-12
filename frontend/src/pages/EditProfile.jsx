import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nickname: user?.nickname || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    birthYear: user?.birthYear || "",
  });

  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        Profil bulunamadı.
      </p>
    );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/update-profile", {
        ...form,
        uid: user.uid,
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/profile");
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      alert("Bir hata oluştu.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full flex justify-center mt-6 px-3">
      <div
        className="
          w-full max-w-[700px]
          p-5 sm:p-8 rounded-xl shadow space-y-6
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        <h1 className="text-2xl sm:text-3xl font-bold">Profili Düzenle</h1>

        {/* FORM */}
        <div className="space-y-5">
          {/* Nickname */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Nickname
            </label>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Telefon
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Cinsiyet
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
            >
              <option value="">Seçiniz</option>
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          {/* Birth Year */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Doğum Yılı
            </label>
            <input
              name="birthYear"
              value={form.birthYear}
              onChange={handleChange}
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="
              w-full px-6 py-3 rounded-lg font-bold
              bg-orange-600 hover:bg-orange-700
              text-white text-sm sm:text-lg
              transition disabled:opacity-50
            "
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
