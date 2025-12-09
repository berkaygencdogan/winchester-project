import { Link } from "react-router-dom";
import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";

export default function Navbar() {
  return (
    <div className="w-full bg-[#0F172A] px-6 py-3 border-b border-gray-700 flex items-center gap-4">
      {/* Home */}
      <Link
        to="/"
        className="px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#223044] transition"
      >
        Home
      </Link>

      {/* Matches Button */}
      <Link
        to="/matches"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#223044] transition"
      >
        <Icon iconNode={soccerBall} />
        <span>Matches</span>
      </Link>
    </div>
  );
}
