import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMatch } from "../hooks/useMatch";

import MatchList from "../components/MatchList";
import MatchDetailPanel from "../components/matches/MatchDetailPanel";

export default function Matches() {
  const { id } = useParams();
  const { selectedMatchId, setSelectedMatchId } = useMatch();

  useEffect(() => {
    if (id) {
      setSelectedMatchId(Number(id));
    } else {
      setSelectedMatchId(null); // <-- /matches sayfası açılınca boş panel göster
    }
  }, [id]);

  return (
    <div className="grid grid-cols-12 max-w-[1600px] mx-auto gap-4 px-4 mt-4">
      {/* LEFT MATCH LIST */}
      <div className="col-span-3 bg-[#1E293B] rounded-xl overflow-hidden">
        <MatchList />
      </div>

      {/* RIGHT - DETAIL AREA */}
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
