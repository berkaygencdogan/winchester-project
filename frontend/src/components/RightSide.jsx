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
    rounded-lg p-3 mb-3
    bg-slate-100 border border-blue-300
    dark:bg-[#0F172A] dark:border-blue-400
  "
      >
        <div className="border border-pink-300 text-center py-2 mb-4 rounded-lg">
          Günün Paylaşımı
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] rounded-lg p-3 mb-3 border border-blue-400"
          >
            yazılar gelecek
          </div>
        ))}
      </div>

      {/* Alt alandaki 4 kutu */}
      <div
        className="
  h-20 rounded-lg
  bg-slate-100
  dark:bg-[#1E293B]
"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#1E293B] h-20 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

export default RightSide;
