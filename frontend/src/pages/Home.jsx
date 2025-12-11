import { useState } from "react";
import MatchList from "../components/MatchList";
import BotFeed from "./BotFeed";
import AdminFeed from "./AdminFeed";
import ForumFeed from "../components/ForumFeed";
import RightSide from "../components/RightSide";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("bot");

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* -------- MOBILE VIEW (≤640px) -------- */}
      <div className="sm:hidden px-3 pt-3">
        {/* Sticky Tab Bar */}
        <div className="sticky top-[65px] z-20 bg-[#0F172A] py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["bot", "admin", "forum"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200
                  ${
                    activeTab === tab
                      ? "bg-orange-600 text-white"
                      : "bg-[#1E293B] text-gray-300"
                  }
                `}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* FEED CONTENT */}
        <div className="space-y-4 mt-2 mb-10">
          {activeTab === "bot" && <BotFeed mobile />}
          {activeTab === "admin" && <AdminFeed mobile />}
          {activeTab === "forum" && <ForumFeed mobile />}
        </div>
      </div>

      {/* -------- DESKTOP VIEW (≥640px) -------- */}
      <div className="hidden sm:grid grid-cols-12 gap-4 p-4">
        {/* LEFT: MATCH LIST */}
        <div className="col-span-3 bg-[#1E293B] rounded-xl overflow-y-auto max-h-[calc(100vh-110px)]">
          <MatchList />
        </div>

        {/* CENTER */}
        <div className="col-span-6">
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

          <div className="space-y-6">
            {activeTab === "bot" && <BotFeed />}
            {activeTab === "admin" && <AdminFeed />}
            {activeTab === "forum" && <ForumFeed />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-3">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
