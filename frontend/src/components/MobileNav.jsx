import { useLocation, useNavigate } from "react-router-dom";
import { Home, Trophy, MessageCircle, User } from "lucide-react";

export default function MobileNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      match: (p) => p === "/",
    },
    {
      id: "matches",
      label: "Matches",
      icon: Trophy,
      path: "/matches",
      match: (p) => p.startsWith("/matches"),
    },
    {
      id: "forum",
      label: "Forum",
      icon: MessageCircle,
      path: "/forum",
      match: (p) => p.startsWith("/forum"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
      match: (p) => p.startsWith("/profile"),
    },
  ];

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-white dark:bg-[#1E293B]
        border-t border-slate-200 dark:border-gray-700
        flex justify-around items-center
        py-2 md:hidden z-50
      "
    >
      {tabs.map((tab) => {
        const isActive = tab.match(pathname);
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`
              flex flex-col items-center gap-1
              px-4 py-1 rounded-md transition
              ${
                isActive
                  ? "text-orange-500 dark:text-orange-400 scale-110"
                  : "text-gray-500 dark:text-gray-300"
              }
            `}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

            <span className="text-[11px] font-semibold tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
