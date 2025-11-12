import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
        Winchester
      </h1>

      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className={`hover:underline ${
            pathname === "/"
              ? "font-semibold text-blue-500 dark:text-yellow-300"
              : ""
          }`}
        >
          Anasayfa
        </Link>
        <Link
          to="/login"
          className={`hover:underline ${
            pathname === "/login"
              ? "font-semibold text-blue-500 dark:text-yellow-300"
              : ""
          }`}
        >
          Giriş
        </Link>
        <Link
          to="/register"
          className={`hover:underline ${
            pathname === "/register"
              ? "font-semibold text-blue-500 dark:text-yellow-300"
              : ""
          }`}
        >
          Kayıt
        </Link>
        <Link
          to="/profile"
          className={`hover:underline ${
            pathname === "/profile"
              ? "font-semibold text-blue-500 dark:text-yellow-300"
              : ""
          }`}
        >
          Profil
        </Link>

        <button
          onClick={() => setDark(!dark)}
          className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 hover:scale-105 transition-all"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
