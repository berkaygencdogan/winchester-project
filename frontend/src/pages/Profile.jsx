import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import MessageModal from "../components/MessageModal";

export default function Profile() {
  const { uid } = useParams(); // URL'den gelen uid (başkasının profili)
  const db = getFirestore();

  const loggedUser = JSON.parse(localStorage.getItem("user")); // login olan
  const [user, setUser] = useState(null); // profili görüntülenen
  const [loading, setLoading] = useState(true);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [activeTab, setActiveTab] = useState("topics");

  const profileUid = uid || loggedUser?.uid;
  const isMyProfile = loggedUser?.uid === profileUid;

  /* 🔹 FIRESTORE'DAN PROFİLİ ÇEK */
  useEffect(() => {
    async function loadUser() {
      if (!profileUid) return;

      try {
        const snap = await getDoc(doc(db, "users", profileUid));
        if (snap.exists()) {
          setUser(snap.data());
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Profil yüklenemedi:", err);
      }
      setLoading(false);
    }

    loadUser();
  }, [profileUid]);

  if (loading)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        Yükleniyor...
      </p>
    );

  if (!user)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        Kullanıcı bulunamadı.
      </p>
    );

  const forumAge = getForumAge(user.createdAt);
  const age = user.birthYear
    ? new Date().getFullYear() - Number(user.birthYear)
    : null;

  return (
    <div className="max-w-[1100px] mx-auto mt-6 px-4 space-y-6">
      {/* PROFIL HEADER */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow border border-slate-200 dark:border-gray-700 flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center w-full sm:w-[220px]">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-200 dark:bg-[#0F172A] flex items-center justify-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-full h-full object-cover"
                alt={user.nickname}
              />
            ) : (
              <span className="text-4xl text-slate-700 dark:text-gray-300">
                {user.nickname?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {user.nickname}
          </p>

          {user.role === "admin" && (
            <span className="mt-1 text-xs bg-red-600 text-white px-2 py-1 rounded-md">
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

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            {!isMyProfile && (
              <button
                onClick={() => setShowMessageModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-2 rounded-lg"
              >
                Özel Mesaj Gönder
              </button>
            )}

            {isMyProfile && (
              <>
                <Link
                  to="/messages"
                  className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg font-semibold"
                >
                  Mesajlar
                </Link>

                <Link
                  to="/edit-profile"
                  className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg font-semibold"
                >
                  Profili Düzenle
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TABLAR */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center">
        <TabBox
          label="Konular"
          active={activeTab === "topics"}
          onClick={() => setActiveTab("topics")}
        />
        {isMyProfile && (
          <TabBox
            label="Mesajlar"
            active={activeTab === "messages"}
            onClick={() => setActiveTab("messages")}
          />
        )}
        <TabBox
          label="Beğeniler"
          active={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}
        />
        <TabBox label="Takipçi" value={user.stats?.followers || 0} />
        <TabBox label="Takip Edilen" value={user.stats?.following || 0} />
      </div>

      {/* BILGILER */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow border border-slate-200 dark:border-gray-700 space-y-3">
        <InfoRow label="Forum Yaşı" value={forumAge} />
        <InfoRow label="Cinsiyet" value={user.gender} />
        <InfoRow
          label="Doğum Yılı"
          value={`${user.birthYear} (${age} yaşında)`}
        />
        <InfoRow label="E-posta" value={user.email} />
      </div>

      {/* ICERIK */}
      <div className="bg-white dark:bg-[#1E293B] p-6 rounded-xl shadow border border-slate-200 dark:border-gray-700">
        {activeTab === "topics" && (
          <p className="text-slate-500">Konu listesi</p>
        )}
        {activeTab === "messages" && isMyProfile && (
          <p className="text-slate-500">Gelen mesajlar</p>
        )}
        {activeTab === "likes" && <p className="text-slate-500">Beğeniler</p>}
      </div>

      {showMessageModal && (
        <MessageModal
          toUser={user}
          onClose={() => setShowMessageModal(false)}
        />
      )}
    </div>
  );
}

/* ---------- HELPERS ---------- */

function TabBox({ label, value, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl shadow border transition ${
        active
          ? "bg-orange-500 border-orange-400 text-black"
          : "bg-white dark:bg-[#1E293B] border-slate-200 dark:border-gray-700"
      }`}
    >
      <p className="text-xl font-bold">{value ?? ""}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-200 dark:border-gray-700 pb-2">
      <p className="text-slate-600 dark:text-gray-300">{label}</p>
      <p className="text-slate-900 dark:text-white font-semibold">{value}</p>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-slate-500 dark:text-gray-400">{label}</p>
      <p className="text-slate-900 dark:text-white font-semibold">{value}</p>
    </div>
  );
}

function getForumAge(createdAt) {
  if (!createdAt) return "-";
  const diff = Date.now() - createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 30) return `${days} gün`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay`;
  return `${Math.floor(months / 12)} yıl`;
}
