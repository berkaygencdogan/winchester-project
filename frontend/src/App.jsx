import "./i18n";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/Home";
import Matches from "./pages/Matches";
import Forum from "./pages/Forum";
import ForumDetail from "./pages/ForumDetail";
import CreateThread from "./pages/CreateThread";
import { AuthProvider } from "./context/AuthProvider";
import useAdblockDetector from "./hooks/useAdblockDetector";
import MobileNav from "./components/MobileNav";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  const adblock = useAdblockDetector();
  if (adblock) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-red-500 z-[999999] backdrop-blur-xl select-none">
        <div className="animate-pulse text-6xl font-extrabold tracking-widest">
          🚫 AD BLOCK DETECTED 🚫
        </div>

        <p className="mt-6 text-2xl text-center max-w-[600px] text-red-400">
          Reklam engelleyici aktif olduğu için siteye erişiminiz engellendi.
          <br />
          <span className="text-red-300 font-bold">
            Lütfen AdBlock'u devre dışı bırakıp sayfayı yenileyin.
          </span>
        </p>

        <div className="mt-10 text-red-600 text-lg font-mono border border-red-700 px-6 py-3 rounded-lg bg-black bg-opacity-40">
          ERROR CODE: 403–ADBLOCK–BLOCKED
        </div>

        <div className="absolute bottom-10 text-red-700 opacity-60 text-sm">
          Site güvenlik duvarı etkin • Tracking sistemleri devre dışı bırakıldı
        </div>
      </div>
    );
  }
  return (
    <AuthProvider>
      <div className="bg-[#0F172A] text-white min-h-screen relative">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/matches/:id" element={<Matches />} />
          <Route path="/matches/" element={<Matches />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="/create-thread" element={<CreateThread />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
      <MobileNav />
    </AuthProvider>
  );
}

export default App;
