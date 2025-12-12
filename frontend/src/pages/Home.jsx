import { useState } from "react";
import MatchList from "../components/MatchList";
import BotFeed from "./BotFeed";
import AdminFeed from "./AdminFeed";
import ForumFeed from "../components/ForumFeed";
import RightSide from "../components/RightSide";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("bot");

  const tabs = ["bot", "admin", "forum"];

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* ================= MOBILE VIEW ================= */}
      <div className="sm:hidden px-3 pt-3">
        {/* Sticky Tab Bar */}
        <div className="sticky top-[65px] z-20 bg-slate-50 dark:bg-[#0F172A] py-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all
                  ${
                    activeTab === tab
                      ? "bg-orange-600 text-white"
                      : "bg-white text-slate-700 border border-slate-200 dark:bg-[#1E293B] dark:text-gray-300 dark:border-gray-700"
                  }
                `}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* FEED CONTENT */}
        <div className="space-y-4 mt-3 mb-10">
          {activeTab === "bot" && <BotFeed mobile />}
          {activeTab === "admin" && <AdminFeed mobile />}
          {activeTab === "forum" && <ForumFeed mobile />}
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden sm:grid grid-cols-12 gap-4 p-4">
        {/* LEFT: MATCH LIST */}
        <div className="col-span-3 card overflow-y-auto max-h-[calc(100vh-110px)]">
          <MatchList />
        </div>

        {/* CENTER */}
        <div className="col-span-6">
          {/* Tabs */}
          <div className="flex gap-3 mb-4 p-2 rounded-xl bg-white border border-slate-200 dark:bg-[#1E293B] dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition
                  ${
                    activeTab === tab
                      ? "bg-orange-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#0F172A] dark:text-gray-300 dark:hover:bg-gray-800"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* FEEDS */}
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
