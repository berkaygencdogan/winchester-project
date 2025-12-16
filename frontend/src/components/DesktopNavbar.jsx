import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import NavbarSearch from "../components/NavbarSearch";
import NavbarNotification from "../components/NavbarNotification";
import i18n from "../i18n";

export default function DesktopNavbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="
        hidden sm:flex w-full items-center gap-5
        px-6 py-3
        sticky top-0 z-40
        bg-white text-slate-800
        border-b border-slate-200
        dark:bg-gray-900 dark:text-white dark:border-gray-700
        transition-colors
      "
    >
      <Link to="/" className="link font-semibold">
        {t("home")}
      </Link>

      <Link to="/matches" className="link">
        {t("matches")}
      </Link>

      <Link to="/forum" className="link">
        {t("forum")}
      </Link>

      <NavbarSearch />

      <div className="ml-auto flex items-center gap-4">
        {/* LANG */}
        <select
          className="
            p-2 rounded-md
            bg-white border border-slate-300
            text-slate-800
            dark:bg-[#1E293B] dark:border-gray-700 dark:text-white
          "
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {["en", "tr", "de", "fr"].map((l) => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="
            px-3 py-1 rounded-md
            bg-slate-100 text-slate-800
            dark:bg-gray-800 dark:text-white
            transition
          "
          title="Tema değiştir"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user && <NavbarNotification />}

        {user && (
          <>
            <Link to="/profile" className="link font-semibold">
              {user.nickname}
            </Link>

            <button
              onClick={logout}
              className="
                px-3 py-1 rounded-md
                bg-red-600 text-white
                hover:bg-red-700 transition
              "
            >
              {t("logout")}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
