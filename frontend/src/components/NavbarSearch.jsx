import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";

/* ------------------ AVATAR FALLBACK ------------------ */
function getAvatar(avatar, nickname) {
  if (avatar) return avatar;

  const letter = nickname?.charAt(0)?.toUpperCase() || "U";
  return `https://ui-avatars.com/api/?name=${letter}&background=ffb347&color=000&bold=true`;
}

export default function NavbarSearch() {
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const db = getFirestore();

  /* ------------------ SEARCH LOGIC ------------------ */
  useEffect(() => {
    if (!queryText.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    async function runSearch() {
      const q = queryText.toLowerCase();

      /* USERS */
      const userSnap = await getDocs(
        query(
          collection(db, "users"),
          where("nickname", ">=", q),
          where("nickname", "<=", q + "\uf8ff"),
          limit(5)
        )
      );

      const players = userSnap.docs.map((d) => ({
        type: "player",
        uid: d.id,
        nickname: d.data().nickname,
        avatar: d.data().avatar || null,
      }));

      /* TOPICS */
      const topicSnap = await getDocs(
        query(
          collection(db, "forumThreads"),
          where("title", ">=", queryText),
          where("title", "<=", queryText + "\uf8ff"),
          limit(5)
        )
      );

      const topics = topicSnap.docs.map((d) => ({
        type: "topic",
        id: d.id,
        title: d.data().title,
      }));

      setResults([...players, ...topics]);
      setOpen(true);
    }

    runSearch();
  }, [queryText]);

  /* ------------------ OUTSIDE CLICK ------------------ */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQueryText("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-[260px]">
      {/* INPUT */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
        <Search size={18} className="text-slate-500 dark:text-gray-400" />
        <input
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Oyuncu veya konu ara..."
          className="bg-transparent outline-none text-sm w-full text-slate-800 dark:text-white"
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute top-[110%] left-0 w-full
            bg-white dark:bg-[#1E293B]
            border border-slate-200 dark:border-gray-700
            rounded-xl shadow-lg z-50
          "
        >
          {results.length === 0 && (
            <p className="p-3 text-sm text-slate-500 dark:text-gray-400">
              Sonuç bulunamadı
            </p>
          )}

          {results.map((r) =>
            r.type === "player" ? (
              <Link
                key={r.uid}
                to={`/profile/${r.uid}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-[#0F172A]"
              >
                <img
                  src={getAvatar(r.avatar, r.nickname)}
                  className="w-8 h-8 rounded-full object-cover"
                  alt={r.nickname}
                />
                <span className="font-medium">{r.nickname}</span>
                <span className="ml-auto text-xs text-slate-400">Oyuncu</span>
              </Link>
            ) : (
              <Link
                key={r.id}
                to={`/forum/${r.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-slate-100 dark:hover:bg-[#0F172A]"
              >
                <span className="font-medium">{r.title}</span>
                <span className="ml-auto text-xs text-slate-400">Konu</span>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
