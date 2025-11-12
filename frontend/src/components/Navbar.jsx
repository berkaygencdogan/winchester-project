import { Link, useLocation } from "react-router-dom";
import { logout } from "../firebaseAuthListener";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Navbar() {
  const { pathname } = useLocation();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("Noname");

  // 🔹 Tema yönetimi
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // 🔹 Firebase kullanıcı takibi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // MongoDB’den kullanıcıyı çek
        try {
          const res = await fetch(
            `http://localhost:5000/api/users/get/${currentUser.uid}`
          );
          const data = await res.json();
          if (data.success) {
            setUsername(data.user.username || "Noname");
          } else {
            setUsername("Noname");
          }
        } catch (err) {
          console.error("Kullanıcı adı alınamadı:", err);
          setUsername("Noname");
        }
      } else {
        setUsername("Noname");
      }
    });

    return () => unsubscribe();
  }, []);

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

        <div>
          {user ? (
            <>
              <span className="mr-3 font-medium">{username || "Noname"}</span>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <a href="/login" className="text-blue-300 hover:underline">
              Giriş Yap
            </a>
          )}
        </div>

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
