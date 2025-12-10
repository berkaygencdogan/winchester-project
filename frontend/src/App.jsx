import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/Home";
import Matches from "./pages/Matches";
import Forum from "./pages/Forum";
import ForumDetail from "./pages/ForumDetail";
import { AuthProvider } from "./context/AuthProvider";

function App() {
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
        </Routes>

        <div className="fixed bottom-6 right-6 w-20 h-20 flex items-center justify-center rounded-full border-4 border-yellow-400 text-yellow-400 font-bold text-lg bg-[#0F172A] shadow-xl">
          AI BOT
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
