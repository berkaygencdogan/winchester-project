import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MessageModal from "../components/MessageModal";

export default function Profile() {
  const { uid } = useParams();
  const db = getFirestore();

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const profileUid = uid || loggedUser?.uid;
  const isMyProfile = loggedUser?.uid === profileUid;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [topics, setTopics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState([]);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [activeTab, setActiveTab] = useState("topics");

  /* ================= PROFİL ================= */
  useEffect(() => {
    if (!profileUid) return;

    getDoc(doc(db, "users", profileUid)).then((snap) => {
      if (snap.exists()) setUser(snap.data());
      else setUser(null);
      setLoading(false);
    });
  }, [profileUid]);

  /* ================= KONULAR ================= */
  useEffect(() => {
    if (!profileUid) return;

    const q = query(
      collection(db, "forumThreads"),
      where("author.uid", "==", profileUid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      setTopics(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [profileUid]);

  /* ================= MESAJLAR ================= */
  useEffect(() => {
    if (!isMyProfile) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", profileUid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [profileUid, isMyProfile]);

  /* ================= BEĞENİLER ================= */
  useEffect(() => {
    if (!profileUid) return;

    const q = query(
      collection(db, "likes"),
      where("userId", "==", profileUid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      setLikes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [profileUid]);

  if (loading)
    return (
      <p className="text-center mt-10 text-slate-500 dark:text-gray-400">
        Yükleniyor…
      </p>
    );

  if (!user)
    return (
      <p className="text-center mt-10 text-slate-500 dark:text-gray-400">
        Kullanıcı yok
      </p>
    );

  const forumAge = getForumAge(user.createdAt);
  const age = user.birthYear
    ? new Date().getFullYear() - Number(user.birthYear)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      <div className="max-w-[1100px] mx-auto pt-6 px-4 space-y-6">
        {/* HEADER */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-gray-700 flex gap-6">
          <div className="flex flex-col items-center w-[220px]">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-200 dark:bg-[#0F172A] flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-slate-700 dark:text-gray-300">
                  {(user.nickname || "?")[0].toUpperCase()}
                </span>
              )}
            </div>

            <p className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
              {user.nickname}
            </p>

            {user.role === "admin" && (
              <span className="mt-1 text-xs bg-red-600 text-white px-2 py-1 rounded">
                Admin
              </span>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <InfoBlock label="Son Görülme" value="Bilinmiyor" />
            <InfoBlock
              label="Şu anki Aktivite"
              value={`${user.nickname} adlı kullanıcının profili`}
            />

            <div className="flex gap-3 pt-2">
              {!isMyProfile && (
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-5 py-2 rounded-lg font-semibold"
                >
                  Özel Mesaj
                </button>
              )}

              {isMyProfile && (
                <>
                  <Link
                    to="/messages"
                    className="
    bg-orange-500 hover:bg-orange-600
    text-black font-semibold
    px-5 py-2 rounded-lg
    transition
  "
                  >
                    Mesajlar
                  </Link>

                  <Link
                    to="/edit-profile"
                    className="
    bg-orange-500 hover:bg-orange-600
    text-black font-semibold
    px-5 py-2 rounded-lg
    transition
  "
                  >
                    Profili Düzenle
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* TABLAR */}
        <div className="grid grid-cols-5 gap-3 text-center">
          <TabBox
            label="Konular"
            value={topics.length}
            active={activeTab === "topics"}
            onClick={() => setActiveTab("topics")}
          />
          {isMyProfile && (
            <TabBox
              label="Mesajlar"
              value={messages.length}
              active={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
            />
          )}
          <TabBox
            label="Beğeniler"
            value={likes.length}
            active={activeTab === "likes"}
            onClick={() => setActiveTab("likes")}
          />
          <TabBox label="Takipçi" value={user.stats?.followers || 0} />
          <TabBox label="Takip Edilen" value={user.stats?.following || 0} />
        </div>

        {/* BİLGİLER */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-gray-700 space-y-3">
          <InfoRow label="Forum Yaşı" value={forumAge} />
          <InfoRow label="Cinsiyet" value={user.gender} />
          <InfoRow
            label="Doğum Yılı"
            value={`${user.birthYear} (${age} yaşında)`}
          />
          <InfoRow label="E-posta" value={user.email} />
        </div>

        {/* TAB İÇERİĞİ */}
        <div className="bg-white dark:bg-[#1E293B] p-6 rounded-2xl border border-slate-200 dark:border-gray-700 space-y-3">
          {activeTab === "topics" &&
            (topics.length === 0 ? (
              <p className="text-slate-500 dark:text-gray-400">Konu yok.</p>
            ) : (
              topics.map((t) => (
                <Link
                  key={t.id}
                  to={`/forum/${t.id}`}
                  className="block p-3 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-[#0F172A]"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {t.title}
                  </p>
                </Link>
              ))
            ))}

          {activeTab === "messages" &&
            isMyProfile &&
            (messages.length === 0 ? (
              <p className="text-slate-500 dark:text-gray-400">Mesaj yok.</p>
            ) : (
              messages.map((m) => {
                const other = m.from.uid === profileUid ? m.to : m.from;
                return (
                  <Link
                    key={m.id}
                    to={`/messages/${other.uid}`}
                    className="block p-3 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-[#0F172A]"
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {other.nickname}
                    </p>

                    {/* TEXT */}
                    {m.text && (
                      <p className="text-sm text-slate-700 dark:text-gray-300 truncate">
                        {m.text}
                      </p>
                    )}

                    {/* FILE / IMAGE */}
                    {m.file && (
                      <div className="mt-1">
                        {m.file.type?.startsWith("image/") ? (
                          <img
                            src={m.file.url}
                            alt={m.file.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-300">
                            📎
                            <span className="truncate max-w-[160px]">
                              {m.file.name}
                            </span>
                            <span className="opacity-60">
                              {(m.file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })
            ))}

          {activeTab === "likes" &&
            (likes.length === 0 ? (
              <p className="text-slate-500 dark:text-gray-400">Beğeni yok.</p>
            ) : (
              likes.map((l) => (
                <div
                  key={l.id}
                  className="p-3 border border-slate-200 dark:border-gray-700 rounded-lg text-slate-900 dark:text-white"
                >
                  {l.targetType === "thread"
                    ? "Bir konu beğendin"
                    : "Bir mesaj beğendin"}
                </div>
              ))
            ))}
        </div>

        {showMessageModal && (
          <MessageModal
            toUser={user}
            onClose={() => setShowMessageModal(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ===== HELPERS ===== */

function TabBox({ label, value, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition
        ${
          active
            ? "bg-orange-500 text-black"
            : "bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white"
        }
      `}
    >
      <p className="text-xl font-bold">{value ?? ""}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-200 dark:border-gray-700 pb-2">
      <span className="text-slate-600 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-slate-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function getForumAge(createdAt) {
  if (!createdAt) return "-";
  const days = Math.floor((Date.now() - createdAt) / 86400000);
  if (days < 30) return `${days} gün`;
  if (days < 365) return `${Math.floor(days / 30)} ay`;
  return `${Math.floor(days / 365)} yıl`;
}
