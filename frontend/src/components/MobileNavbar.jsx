import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import useTheme from "../hooks/useTheme";
import NavbarNotification from "../components/NavbarNotification";
import NavbarSearch from "../components/NavbarSearch";
import i18n from "../i18n";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileNavbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav
      className="
        sm:hidden w-full
        px-3 py-3
        bg-white dark:bg-gray-900
        border-b border-slate-200 dark:border-gray-700
      "
    >
      {/* ÜST SATIR */}
      <div className="flex items-center justify-between gap-2">
        {/* LANG */}
        <select
          className="p-2 rounded-md bg-white border border-slate-300 dark:bg-[#1E293B]"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {["en", "tr"].map((l) => (
            <option key={l}>{l.toUpperCase()}</option>
          ))}
        </select>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          {/* SEARCH ICON */}
          <button
            onClick={() => setShowSearch((s) => !s)}
            className="p-2 rounded-md bg-slate-100 dark:bg-gray-800"
          >
            <Search size={18} />
          </button>

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md bg-slate-100 dark:bg-gray-800"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user && <NavbarNotification />}
        </div>
      </div>

      {/* SEARCH BAR (AÇILIR) */}
      {showSearch && (
        <div className="mt-3">
          <NavbarSearch />
        </div>
      )}

      {/* USER ROW */}
      {user && (
        <div className="mt-3 flex items-center justify-between">
          <Link
            to="/profile"
            className="font-semibold text-slate-800 dark:text-white"
          >
            {user.nickname}
          </Link>

          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 rounded-md text-white text-sm"
          >
            {t("logout")}
          </button>
        </div>
      )}
    </nav>
  );
}
