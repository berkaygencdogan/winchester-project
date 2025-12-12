import MatchList from "../components/MatchList";
import RightSide from "../components/RightSide";

export default function Matches() {
  return (
    <div className="max-w-[1600px] mx-auto mt-4 px-3 sm:px-0">
      {/* -------- MOBILE VIEW -------- */}
      <div className="sm:hidden">
        <MatchList />
      </div>

      {/* -------- DESKTOP VIEW -------- */}
      <div className="hidden sm:grid grid-cols-12 gap-4">
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

        {/* CENTER PLACEHOLDER */}
        <div
          className="
            col-span-6 rounded-xl flex items-center justify-center
            bg-slate-100 border border-slate-200
            dark:bg-[#0F172A] dark:border-gray-700
          "
        >
          <p className="text-slate-500 dark:text-gray-400">Bir maç seçin</p>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            col-span-3 rounded-xl
            bg-white border border-slate-200
            dark:bg-[#1E293B] dark:border-gray-700
          "
        >
          <RightSide />
        </div>
      </div>
    </div>
  );
}
