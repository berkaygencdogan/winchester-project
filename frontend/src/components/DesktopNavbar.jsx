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
        bg-white dark:bg-gray-900
        border-b border-slate-200 dark:border-gray-700
        sticky top-0 z-40
      "
    >
      <Link to="/" className="nav-item font-semibold">
        {t("home")}
      </Link>

      <Link to="/matches" className="nav-item">
        {t("matches")}
      </Link>

      <Link to="/forum" className="nav-item">
        {t("forum")}
      </Link>

      <NavbarSearch />

      <div className="ml-auto flex items-center gap-4">
        {/* LANG */}
        <select
          className="p-2 rounded-md bg-white border border-slate-300 dark:bg-[#1E293B] dark:border-gray-700"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {["en", "tr", "de", "fr"].map((l) => (
            <option key={l}>{l.toUpperCase()}</option>
          ))}
        </select>

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md bg-slate-100 dark:bg-gray-800"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user && <NavbarNotification />}

        {user ? (
          <>
            <Link to="/profile" className="font-semibold">
              {user.nickname}
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 rounded-md text-white"
            >
              {t("logout")}
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}
