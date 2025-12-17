import { Bell } from "lucide-react";

function RightSide() {
  return (
    <div
      className="
        p-4 rounded-xl
        bg-white border border-slate-200
        dark:bg-[#1E293B] dark:border-gray-700
      "
    >
      {/* Günün Paylaşımı */}
      <div
        className="
          rounded-lg p-3 mb-4
          bg-slate-100 border border-blue-300
          dark:bg-[#0F172A] dark:border-blue-500
        "
      >
        <div
          className="
            text-center py-2 mb-4 rounded-lg font-semibold
            border border-pink-300 text-slate-800
            dark:border-pink-500 dark:text-white
          "
        >
          Günün Paylaşımı
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="
              rounded-lg p-3 mb-3 border
              bg-white text-slate-800 border-blue-300
              dark:bg-[#1E293B] dark:text-white dark:border-blue-500
            "
          >
            yazılar gelecek
          </div>
        ))}
      </div>

      {/* Alt alandaki 4 kutu */}
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="
              h-20 rounded-lg
              bg-slate-100 border border-slate-200
              dark:bg-[#0F172A] dark:border-gray-700
            "
          />
        ))}
      </div>
    </div>
  );
}

export default RightSide;
