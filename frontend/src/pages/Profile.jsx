import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Profil yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
      {/* Başlık */}
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-center mb-6">
        Profil Bilgileri
      </h1>

      {/* Profil Resmi */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            user.avatarUrl ||
            "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          }
          alt="Profil"
          className="w-24 h-24 rounded-full mb-3 border-4 border-gray-100 shadow-md object-cover"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          @{user.username || "kullanici"}
        </h2>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>

      {/* Bilgi Kartı */}
      <div className="bg-gray-50 rounded-xl p-4 shadow-inner space-y-2 text-sm text-gray-700">
        <p>
          <strong>Ad Soyad:</strong> {user.name || "—"}
        </p>
        <p>
          <strong>E-posta:</strong> {user.email || "—"}
        </p>
        <p>
          <strong>Kullanıcı Adı:</strong> @{user.username || "—"}
        </p>
        <p>
          <strong>Profil Resmi:</strong>{" "}
          {user.avatarUrl ? "Yüklü" : "Henüz yok"}
        </p>
      </div>

      {/* Çıkış Butonu */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all duration-300 font-medium shadow-md"
      >
        Çıkış Yap
      </button>

      {/* Alt Bilgi */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Winchester Project © 2025
      </p>
    </div>
  );
}
