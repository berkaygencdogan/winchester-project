import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotificationBox from "./components/NotificationBox";
import HomeScreen from "./pages/Home";
import Matches from "./pages/Matches";

function App() {
  return (
    <div className="bg-[#0F172A] text-white min-h-screen relative">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/matches/:id" element={<Matches />} />
        <Route path="/matches/" element={<Matches />} />
      </Routes>

      <NotificationBox />

      {/* AI BOT FLOATING BUTTON */}
      <div className="fixed bottom-6 right-6 w-20 h-20 flex items-center justify-center rounded-full border-4 border-yellow-400 text-yellow-400 font-bold text-lg bg-[#0F172A] shadow-xl">
        AI BOT
      </div>
    </div>
  );
}

export default App;
