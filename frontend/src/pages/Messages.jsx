import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";

export default function Messages() {
  const [tab, setTab] = useState("inbox"); // inbox | sent
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();

    const q = query(
      collection(db, "messages"),
      where(tab === "inbox" ? "to.uid" : "from.uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [tab]);

  function openChat(message) {
    const user = auth.currentUser;
    const otherUid =
      message.from.uid === user.uid ? message.to.uid : message.from.uid;

    navigate(`/messages/${otherUid}`);
  }

  return (
    <div className="max-w-[1000px] mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mesajlar</h1>

      {/* TABS */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setTab("inbox")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "inbox"
              ? "bg-orange-500 text-black"
              : "bg-slate-100 dark:bg-[#1E293B]"
          }`}
        >
          Gelen Mesajlar
        </button>

        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "sent"
              ? "bg-orange-500 text-black"
              : "bg-slate-100 dark:bg-[#1E293B]"
          }`}
        >
          Giden Mesajlar
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {messages.map((m) => {
          const other = tab === "inbox" ? m.from : m.to;

          return (
            <div
              key={m.id}
              onClick={() => openChat(m)}
              className="
                cursor-pointer
                bg-white dark:bg-[#1E293B]
                border border-slate-200 dark:border-gray-700
                rounded-xl p-4
                hover:bg-slate-50 dark:hover:bg-[#0F172A]
                transition
              "
            >
              <div className="flex items-center gap-3">
                {/* AVATAR */}
                {other.avatar ? (
                  <img
                    src={other.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center font-bold text-black">
                    {other.nickname?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* TEXT */}
                <div className="flex-1">
                  <p className="font-semibold">{other.nickname}</p>
                  <p className="text-sm text-slate-500 truncate">{m.text}</p>
                </div>

                {/* DATE */}
                <div className="text-xs text-slate-400 text-right">
                  {m.createdAt?.toDate().toLocaleString()}
                  {!m.read && tab === "inbox" && (
                    <div className="mt-1 text-red-600 font-bold">●</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <p className="text-center text-slate-500 dark:text-gray-400">
            Mesaj bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}
