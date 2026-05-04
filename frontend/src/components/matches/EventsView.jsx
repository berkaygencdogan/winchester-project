import {
  Icon,
  SquareChartGantt,
  Timer,
  AlarmClockCheck,
  ArrowLeftRight,
} from "lucide-react";
import { soccerBall } from "@lucide/lab";

export default function EventsView({ data, info }) {
  if (!data || !info) return null;

  const homeId = info.home?.id;
  const awayId = info.away?.id;

  if (!data.length) {
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 py-6">
        Olay bilgisi yok.
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {data.map((e, i) => {
        const isHome = e.team?.id === homeId;
        const isAway = e.team?.id === awayId;

        return (
          <div
            key={i}
            className={`flex ${
              isHome ? "justify-start" : "justify-end"
            } items-center`}
          >
            <div
              className={`
                px-3 py-2 rounded-md shadow-md w-fit
                flex items-center gap-2
                bg-white border border-slate-200
                dark:bg-[#1A2332] dark:border-gray-700
                ${isAway ? "flex-row-reverse text-right ml-auto" : "mr-auto"}
              `}
            >
              <EventIcon
                type={e.type}
                detail={e.detail}
                isHome={isHome}
                isAway={isAway}
              />

              <div className="leading-tight">
                <p className="font-semibold">{e.player?.name || "-"}</p>

                {e.assist?.name && (
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    Asist: {e.assist.name}
                  </p>
                )}

                <p className="text-xs text-slate-500 dark:text-gray-400">
                  {formatDetail(e)}
                </p>
              </div>

              <span className="text-xs text-slate-500 dark:text-gray-400 ml-2">
                {e.time?.elapsed}'
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EventIcon({ type, detail, isHome, isAway }) {
  const color = isAway ? "text-blue-400" : "text-green-400";

  if (type === "Goal") {
    if (detail === "Own Goal") {
      return <Icon iconNode={soccerBall} size={18} className="text-red-500" />;
    }

    if (detail === "Penalty") {
      return (
        <Icon iconNode={soccerBall} size={18} className="text-purple-400" />
      );
    }

    if (detail === "Missed Penalty") {
      return <Icon iconNode={soccerBall} size={18} className="text-red-600" />;
    }

    return <Icon iconNode={soccerBall} size={18} className={color} />;
  }

  if (type === "Card") {
    if (detail === "Yellow Card") {
      return <SquareChartGantt size={18} className="text-yellow-400" />;
    }

    if (detail === "Red Card") {
      return <SquareChartGantt size={18} className="text-red-500" />;
    }

    if (detail === "Second Yellow card") {
      return <SquareChartGantt size={18} className="text-orange-400" />;
    }
  }

  if (type === "subst") {
    return <ArrowLeftRight size={18} className={color} />;
  }

  if (type === "Var") {
    return <AlarmClockCheck size={18} className="text-purple-400" />;
  }

  return <Timer size={18} className="text-gray-400" />;
}

function formatDetail(e) {
  if (e.detail === "Missed Penalty") return "Penaltı Kaçtı";
  if (e.detail === "Penalty") return "Penaltı Golü";
  if (e.detail === "Own Goal") return "Kendi Kalesine";
  if (e.type === "subst") return "Oyuncu Değişikliği";
  if (e.type === "Var") return "VAR İncelemesi";

  return e.detail || e.type || "-";
}
