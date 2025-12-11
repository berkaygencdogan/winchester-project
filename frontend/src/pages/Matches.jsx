import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMatch } from "../hooks/useMatch";

import MatchList from "../components/MatchList";
import MatchDetailPanel from "../components/matches/MatchDetailPanel";

export default function Matches() {
  const { id } = useParams();
  const { selectedMatchId, setSelectedMatchId } = useMatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Match ID değişince modal aç / kapat
  useEffect(() => {
    if (id) {
      setSelectedMatchId(Number(id));
      if (isMobile) setShowModal(true);
    } else {
      setSelectedMatchId(null);
      setShowModal(false);
    }
  }, [id, isMobile]);

  // =============== DESKTOP ===============
  if (!isMobile) {
    return (
      <div className="grid grid-cols-12 max-w-[1600px] mx-auto gap-4 px-4 mt-4">
        {/* LEFT MATCH LIST */}
        <div className="col-span-3 bg-[#1E293B] rounded-xl overflow-hidden">
          <MatchList />
        </div>

        {/* RIGHT DETAIL */}
        <div className="col-span-9 bg-[#1E293B] rounded-xl p-4">
          {selectedMatchId ? (
            <MatchDetailPanel />
          ) : (
            <div className="text-center text-gray-400 py-20">
              Bir maç seçiniz...
            </div>
          )}
        </div>
      </div>
    );
  }

  // =============== MOBILE ===============
  return (
    <div className="p-3">
      <MatchList />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end">
          <div className="bg-[#1E293B] w-full h-[85vh] rounded-t-2xl p-4 overflow-y-auto animate-slideUp relative">
            {/* Kapatma */}
            <button
              onClick={() => window.history.back()}
              className="absolute top-3 right-4 text-gray-300 text-2xl"
            >
              ✕
            </button>

            <MatchDetailPanel />
          </div>
        </div>
      )}
    </div>
  );
}
