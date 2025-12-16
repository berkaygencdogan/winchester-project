import MatchList from "../components/MatchList";
import RightSide from "../components/RightSide";
import { useParams } from "react-router-dom";
import MatchDetailPanel from "../components/matches/MatchDetailPanel";

export default function Matches() {
  const { id } = useParams();

  return (
    <div
      className="
        mx-auto min-h-screen
        bg-slate-50 text-slate-900
        dark:bg-[#0F172A] dark:text-white
      "
    >
      {/* -------- MOBILE VIEW -------- */}
      <div className="sm:hidden">
        <MatchList />
      </div>

      {/* -------- DESKTOP VIEW -------- */}
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* LEFT: MATCH LIST */}
        <div
          className="
            col-span-3 rounded-xl overflow-y-auto
            max-h-[calc(100vh-110px)]
            bg-white border border-slate-200
            dark:bg-[#1E293B] dark:border-gray-700
          "
        >
          <MatchList />
        </div>

        {/* CENTER */}
        <div
          className={`
            rounded-xl min-h-[calc(100vh-110px)]
            bg-slate-100 border border-slate-200
            dark:bg-[#0F172A] dark:border-gray-700
            ${id ? "col-span-9" : "col-span-6"}
          `}
        >
          {id ? (
            <MatchDetailPanel />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-slate-500 dark:text-gray-400">Bir maç seçin</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (SADECE MAÇ SEÇİLİ DEĞİLKEN) */}
        {!id && (
          <div
            className="
              col-span-3 rounded-xl
              bg-white border border-slate-200
              dark:bg-[#1E293B] dark:border-gray-700
            "
          >
            <RightSide />
          </div>
        )}
      </div>
    </div>
  );
}
