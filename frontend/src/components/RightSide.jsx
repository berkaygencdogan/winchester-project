import { Bell } from "lucide-react";

function RightSide() {
  return (
    <div className="space-y-6">
      {/* Günün Paylaşımı */}
      <div className="bg-[#1E293B] p-4 rounded-xl">
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
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#1E293B] h-20 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

export default RightSide;
