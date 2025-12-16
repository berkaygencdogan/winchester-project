import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  limit,
  writeBatch,
  doc,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MessageToast from "./MessageToast";

export default function NavbarNotification() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  const prevCountRef = useRef(0);
  const navigate = useNavigate();

  const activeChatUid = localStorage.getItem("activeChatUid");

  /* ================================
     REALTIME LISTENER
  ================================= */
  useEffect(() => {
    const db = getFirestore();
    let unsubMessages = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setMessages([]);
        if (unsubMessages) unsubMessages();
        return;
      }

      const q = query(
        collection(db, "messages"),
        where("to.uid", "==", user.uid),
        where("read", "==", false),
        limit(5)
      );

      unsubMessages = onSnapshot(q, (snap) => {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        /* 🔔 TOAST – sadece YENİ mesaj geldiyse */
        if (list.length > prevCountRef.current && list.length > 0) {
          const newest = list[0];

          // 🔕 aktif chat açıksa toast yok
          if (activeChatUid !== newest.from.uid) {
            toast.custom(
              (t) => (
                <div
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate(`/messages/${newest.from.uid}`);
                  }}
                >
                  <MessageToast
                    avatar={newest.from.avatar}
                    nickname={newest.from.nickname}
                    text={newest.text}
                  />
                </div>
              ),
              {
                position: "top-right",
                duration: 5000,
              }
            );
          }
        }

        prevCountRef.current = list.length;
        setMessages(list);
      });
    });

    return () => {
      unsubAuth();
      if (unsubMessages) unsubMessages();
    };
  }, []);

  /* ================================
     OKUNDU YAP (SADECE TIKLANANLAR)
  ================================= */
  async function markAsRead(fromUid) {
    const db = getFirestore();
    const batch = writeBatch(db);

    messages
      .filter((m) => m.from.uid === fromUid)
      .forEach((m) => {
        batch.update(doc(db, "messages", m.id), { read: true });
      });

    await batch.commit();
  }

  /* ================================
     DIŞARI TIKLANINCA KAPAT
  ================================= */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 🔔 ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0F172A]"
      >
        <Bell className="text-slate-700 dark:text-gray-300" />

        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {messages.length}
          </span>
        )}
      </button>

      {/* 📩 DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-[320px] bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
          <div className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700">
            Bildirimler
          </div>

          {messages.length === 0 && (
            <p className="p-4 text-sm text-slate-500 dark:text-gray-400">
              Yeni mesaj yok
            </p>
          )}

          {messages.map((m) => (
            <Link
              key={m.id}
              to={`/messages/${m.from.uid}`}
              onClick={() => {
                markAsRead(m.from.uid);
                setOpen(false);
              }}
              className="flex gap-3 p-3 hover:bg-slate-100 dark:hover:bg-[#0F172A]"
            >
              <img
                src={m.from.avatar}
                className="w-10 h-10 rounded-full object-cover"
                alt={m.from.nickname}
              />
              <div className="flex-1">
                <p className="font-medium">{m.from.nickname}</p>
                <p className="text-sm text-slate-500 truncate">{m.text}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
