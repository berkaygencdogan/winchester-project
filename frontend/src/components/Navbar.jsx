// frontend/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import PhoneLoginModal from "../auth/LoginModal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#0F172A] px-6 py-3 border-b border-gray-700 flex items-center gap-4">
        <Link to="/" className="px-3 py-2 rounded-lg bg-[#1E293B]">
          Home
        </Link>
        <Link to="/matches" className="px-3 py-2 rounded-lg bg-[#1E293B]">
          Matches
        </Link>
        <Link to="/forum" className="px-3 py-2 rounded-lg bg-[#1E293B]">
          Forum
        </Link>

        <div className="ml-auto">
          {!user ? (
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-green-600 rounded-lg"
            >
              Giriş
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">{user.nickname || "User"}</span>
              <button
                onClick={logout}
                className="px-3 py-2 bg-red-600 rounded-lg"
              >
                Çıkış
              </button>
            </div>
          )}
        </div>
      </div>

      <PhoneLoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
