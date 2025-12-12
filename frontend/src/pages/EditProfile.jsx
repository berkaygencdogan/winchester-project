import { useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bio, setBio] = useState(user.bio || "");
  const [gender, setGender] = useState(user.gender || "");
  const [birthYear, setBirthYear] = useState(user.birthYear || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (file) setAvatarFile(file);
  }

  async function save() {
    setLoading(true);

    try {
      const form = new FormData();
      form.append("uid", user.uid);
      form.append("bio", bio);
      form.append("gender", gender);
      form.append("birthYear", birthYear);

      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      const res = await axios.post("/api/upload/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Backend yeni avatar URL onarıyor
      const updatedUser = {
        ...user,
        avatar: res.data.avatar,
        bio,
        gender,
        birthYear,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profil güncellendi!");
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      alert("Profil güncellenemedi.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-[700px] mx-auto mt-10 bg-[#1E293B] p-6 rounded-xl space-y-5">
      <h1 className="text-2xl font-bold text-white">Profil Düzenle</h1>

      {/* Avatar input */}
      <div>
        <label className="text-gray-300">Avatar</label>
        <input type="file" className="block mt-2" onChange={handleAvatar} />
      </div>

      {/* BIO */}
      <div>
        <label className="text-gray-300">Bio</label>
        <textarea
          className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white h-32 resize-none"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div>
        <label className="text-gray-300">Cinsiyet</label>
        <select
          className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Belirtilmemiş</option>
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
        </select>
      </div>

      {/* Birth year */}
      <div>
        <label className="text-gray-300">Doğum Yılı</label>
        <input
          type="number"
          className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />
      </div>

      <button
        onClick={save}
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold p-3 rounded-lg"
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
