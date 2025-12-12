import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import NotificationBox from "../components/NotificationBox";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  /* 🌐 Dil seçici */
  function LanguageSwitcher() {
    const currentLang = i18n.language || "en";
    return (
      <select
        className="bg-[#1E293B] text-white p-2 rounded-md"
        value={currentLang}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
          localStorage.setItem("i18nextLng", e.target.value);
        }}
      >
        {["en", "tr", "de", "fr", "es", "ar", "ru", "pt", "it", "ja", "zh"].map(
          (lng) => (
            <option key={lng} value={lng}>
              {lng.toUpperCase()}
            </option>
          )
        )}
      </select>
    );
  }

  /* BUTON GRUBU — hem desktop hem mobile kullanacak */
  const AuthButtons = (
    <>
      {!user ? (
        <div className="flex gap-3">
          <button
            onClick={() => setShowLogin(true)}
            className="px-3 py-1 bg-orange-600 rounded-md hover:bg-orange-700 transition"
          >
            {t("login")}
          </button>

          <button
            onClick={() => setShowRegister(true)}
            className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-700 transition"
          >
            {t("register")}
          </button>
        </div>
      ) : (
        <div className="font-bold text-white flex items-center gap-3">
          <Link to="/profile" className="nav-item">
            {user.nickname}
          </Link>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
          >
            {t("logout")}
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* 🖥 DESKTOP MENU */}
      <div className="hidden sm:flex w-full bg-[#0F172A] px-6 py-3 border-b border-gray-700 items-center gap-4">
        <Link to="/" className="nav-item">
          {t("home")}
        </Link>
        <Link to="/matches" className="nav-item">
          {t("matches")}
        </Link>
        <Link to="/forum" className="nav-item">
          {t("forum")}
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher />
          <NotificationBox />
          {AuthButtons}
        </div>
      </div>

      {/* 📱 MOBILE TOP MENU (DESKTOP TASARIMI AYNEN KORUNDU) */}
      <div className="sm:hidden w-full bg-[#0F172A] px-3 py-3 border-b border-gray-700 flex flex-wrap justify-center gap-3">
        <LanguageSwitcher />
        <NotificationBox />

        {/* Tema ikonu (istersen sonra çalıştırırız) */}
        <button className="px-3 py-1 bg-[#1E293B] rounded-md">🌙</button>

        {/* LOGIN & REGISTER desktop ile birebir aynı */}
        {AuthButtons}
      </div>

      {/* MODALS */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
