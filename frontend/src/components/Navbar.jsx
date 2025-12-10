import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import NotificationBox from "../components/NotificationBox";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <div className="w-full bg-[#0F172A] px-6 py-3 border-b border-gray-700 flex items-center gap-4">
        {/* LEFT LINKS */}
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/matches" className="nav-item">
          Matches
        </Link>
        <Link to="/forum" className="nav-item">
          Forum
        </Link>

        {/* RIGHT SECTION */}
        <div className="ml-auto flex items-center gap-4">
          {/* 🔔 NOTIFICATIONS — giriş/kayıt butonlarının SOLUNDA */}
          <NotificationBox />

          {/* AUTH BUTTONS */}
          {!user ? (
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-1 bg-orange-600 rounded-md hover:bg-orange-700 transition"
              >
                Giriş
              </button>

              <button
                onClick={() => setShowRegister(true)}
                className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-700 transition"
              >
                Kayıt
              </button>
            </div>
          ) : (
            <div className="font-bold text-white flex items-center gap-3">
              {user.nickname}

              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700"
              >
                Çıkış
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}
