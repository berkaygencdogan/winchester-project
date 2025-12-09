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

  const homeId = info.teams.home.id;
  const awayId = info.teams.away.id;

  return (
    <div className="space-y-3 mt-4">
      {data.map((e, i) => {
        const isHome = e.team.id === homeId;
        const isAway = e.team.id === awayId;

        return (
          <div
            key={i}
            className={`flex ${
              isHome ? "justify-start" : "justify-end"
            } items-center`}
          >
            <div
              className={`bg-[#1A2332] px-3 py-2 rounded-md shadow-md w-fit
              flex items-center gap-2
              ${isAway ? "flex-row-reverse text-right ml-auto" : "mr-auto"}
            `}
            >
              {/* ICON */}
              <EventIcon
                type={e.type}
                detail={e.detail}
                isHome={isHome}
                isAway={isAway}
              />

              {/* TEXT */}
              <div className="leading-tight">
                <p className="font-semibold">{e.player?.name}</p>

                {e.assist?.name && (
                  <p className="text-xs text-gray-400">{e.assist.name}</p>
                )}

                <p className="text-xs text-gray-400">{formatDetail(e)}</p>
              </div>

              {/* MINUTE */}
              <span className="text-xs text-gray-400 ml-2">
                {e.time.elapsed}'
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------- EVENT ICONS (FULL PRO VERSION) ---------------------- */

function EventIcon({ type, detail, isHome, isAway }) {
  // Profesyonel renk paleti
  const homeColor = "text-green-400";
  const awayColor = "text-blue-400";

  const color = isAway ? awayColor : homeColor;

  /* --------------------- GOL --------------------- */
  if (type === "Goal") {
    // Kendi kalesine
    if (detail === "Own Goal") {
      return (
        <Icon
          iconNode={soccerBall}
          size={18}
          className={isHome ? "text-red-500" : "text-red-400"}
        />
      );
    }

    // Penaltı golü
    if (detail === "Penalty") {
      return (
        <Icon
          iconNode={soccerBall}
          size={18}
          className={isHome ? "text-purple-400" : "text-purple-300"}
        />
      );
    }

    // Kaçan penaltı
    if (detail === "Missed Penalty") {
      return (
        <Icon
          iconNode={soccerBall}
          size={18}
          className={isHome ? "text-red-600" : "text-red-400"}
        />
      );
    }

    // Normal gol
    return <Icon iconNode={soccerBall} size={18} className={color} />;
  }

  /* --------------------- KART --------------------- */
  if (type === "Card") {
    if (detail === "Yellow Card")
      return (
        <SquareChartGantt
          size={18}
          className={isHome ? "text-yellow-400" : "text-yellow-300"}
        />
      );

    if (detail === "Red Card")
      return (
        <SquareChartGantt
          size={18}
          className={isHome ? "text-red-500" : "text-red-400"}
        />
      );

    if (detail === "Second Yellow card")
      return (
        <SquareChartGantt
          size={18}
          className={isHome ? "text-orange-400" : "text-orange-300"}
        />
      );
  }

  /* --------------------- DEĞİŞİKLİK --------------------- */
  if (type === "subst") {
    return (
      <ArrowLeftRight
        size={18}
        className={isHome ? "text-green-300" : "text-blue-300"}
      />
    );
  }

  /* --------------------- VAR --------------------- */
  if (type === "Var") {
    return (
      <AlarmClockCheck
        size={18}
        className={isHome ? "text-purple-400" : "text-purple-300"}
      />
    );
  }

  /* --------------------- DİĞER TÜRLER --------------------- */
  return (
    <Timer size={18} className={isHome ? "text-gray-300" : "text-gray-400"} />
  );
}

/* ---------------------- OLAY METNİ FORMATLAYICI ---------------------- */

function formatDetail(e) {
  // Özel isimlendirmeler
  if (e.detail === "Missed Penalty") return "Penaltı Kaçtı";
  if (e.detail === "Penalty") return "Penaltı Golü";
  if (e.detail === "Own Goal") return "Kendi Kalesine";
  if (e.detail === "Var") return "VAR İncelemesi";

  return e.detail;
}
