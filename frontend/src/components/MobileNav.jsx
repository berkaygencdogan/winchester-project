import { useLocation, useNavigate } from "react-router-dom";

export default function MobileNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs = [
    { id: "home", icon: "🏠", path: "/" },
    { id: "matches", icon: "📊", path: "/matches" },
    { id: "forum", icon: "💬", path: "/forum" },
    { id: "profile", icon: "👤", path: "/profile" },
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
        const isActive = pathname === tab.path;

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`
              flex flex-col items-center gap-1 px-4 py-1 rounded-md transition
              ${
                isActive
                  ? "text-orange-500 dark:text-orange-400 scale-110"
                  : "text-gray-500 dark:text-gray-300"
              }
            `}
          >
            <span className="text-2xl leading-none">{tab.icon}</span>

            {/* Alt yazı */}
            <span className="text-[11px] font-semibold tracking-wide">
              {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
