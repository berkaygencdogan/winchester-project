import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import NotificationBox from "../components/NotificationBox";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { theme, toggleTheme } = useTheme();

  /* ======================================================
     LANGUAGE SWITCHER
  ====================================================== */
  function LanguageSwitcher() {
    const currentLang = i18n.language || "en";

    return (
      <select
        className="
          p-2 rounded-md
          bg-white text-slate-800 border border-slate-300
          dark:bg-[#1E293B] dark:text-white dark:border-gray-700
        "
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

  /* ======================================================
     AUTH BUTTONS
  ====================================================== */
  const AuthButtons = (
    <>
      {!user ? (
        <div className="flex gap-3">
          <button
            onClick={() => setShowLogin(true)}
            className="px-3 py-1 bg-orange-600 rounded-md hover:bg-orange-700 transition text-white"
          >
            {t("login")}
          </button>

          <button
            onClick={() => setShowRegister(true)}
            className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-700 transition text-white"
          >
            {t("register")}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 font-bold">
          <Link to="/profile" className="nav-item">
            {user.nickname}
          </Link>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 text-white"
          >
            {t("logout")}
          </button>
        </div>
      )}
    </>
  );

  /* ======================================================
     RETURN
  ====================================================== */
  return (
    <>
      {/* 🖥 DESKTOP NAVBAR */}
      <nav
        className="
          hidden sm:flex w-full items-center gap-4
          px-6 py-3
          bg-white dark:bg-gray-900
          border-b border-slate-200 dark:border-gray-700
        "
      >
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

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 rounded-md
              bg-slate-100 text-slate-700
              dark:bg-gray-800 dark:text-white
            "
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {AuthButtons}
        </div>
      </nav>

      {/* 📱 MOBILE TOP NAV */}
      <nav
        className="
          sm:hidden w-full flex flex-wrap justify-center gap-3
          px-3 py-3
          bg-white dark:bg-gray-900
          border-b border-slate-200 dark:border-gray-700
        "
      >
        <LanguageSwitcher />
        <NotificationBox />

        <button
          onClick={toggleTheme}
          className="
            px-3 py-1 rounded-md
            bg-slate-100 text-slate-700
            dark:bg-gray-800 dark:text-white
          "
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {AuthButtons}
      </nav>

      {/* MODALS */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
