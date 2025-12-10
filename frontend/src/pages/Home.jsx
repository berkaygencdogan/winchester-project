import { useState } from "react";
import MatchList from "../components/MatchList";
import BotFeed from "./BotFeed";
import AdminFeed from "./AdminFeed";
import ForumFeed from "../components/ForumFeed";
import RightSide from "../components/RightSide";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("bot");

  return (
    <div className="grid grid-cols-12 max-w-[1600px] mx-auto gap-4 px-4 mt-4">
      {/* LEFT SCROLL MATCH LIST */}
      <div className="col-span-3 bg-[#1E293B] rounded-xl overflow-y-auto max-h-[calc(100vh-110px)]">
        <MatchList />
      </div>

      {/* MIDDLE CONTENT */}
      <div className="col-span-6">
        {/* TAB BAR */}
        <div className="flex gap-3 mb-4 bg-[#1E293B] p-2 rounded-xl">
          <button
            onClick={() => setActiveTab("bot")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "bot" ? "bg-orange-600" : "bg-[#0F172A]"
            }`}
          >
            Bot
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "admin" ? "bg-orange-600" : "bg-[#0F172A]"
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => setActiveTab("forum")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === "forum" ? "bg-orange-600" : "bg-[#0F172A]"
            }`}
          >
            Forum
          </button>
        </div>

        {/* FEED AREA */}
        <div className="space-y-6">
          {activeTab === "bot" && <BotFeed />}
          {activeTab === "admin" && <AdminFeed />}
          {activeTab === "forum" && <ForumFeed />}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-3">
        <RightSide />
      </div>
    </div>
  );
}
