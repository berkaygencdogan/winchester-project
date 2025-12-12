import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("topics"); // ⭐ Varsayılan TAB

  if (!user)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        Yükleniyor...
      </p>
    );

  const forumAge = getForumAge(user.createdAt);
  const age = user.birthYear
    ? new Date().getFullYear() - Number(user.birthYear)
    : null;

  return (
    <div className="max-w-[1100px] mx-auto mt-6 px-4 space-y-6">
      <div
        className="
          bg-white dark:bg-[#1E293B]
          p-6 rounded-xl shadow
          flex flex-col sm:flex-row gap-6
          border border-slate-200 dark:border-gray-700
        "
      >
        <div className="flex flex-col items-center w-full sm:w-[220px]">
          <div
            className="
              w-28 h-28 rounded-full overflow-hidden
              bg-slate-200 dark:bg-[#0F172A]
              flex items-center justify-center
            "
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-full h-full object-cover"
                alt={user.nickname}
              />
            ) : (
              <span className="text-4xl text-slate-700 dark:text-gray-300">
                {user.nickname.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {user.nickname}
          </p>

          <span className="mt-1 text-xs bg-purple-600 text-white px-2 py-1 rounded-md">
            Üye
          </span>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-slate-500 dark:text-gray-400">Son Görülme</p>
            <p className="text-slate-900 dark:text-white font-semibold">
              Bilinmiyor
            </p>
          </div>

          <div>
            <p className="text-slate-500 dark:text-gray-400">
              Şu anki Aktivite
            </p>
            <p className="text-slate-900 dark:text-white font-semibold">
              {user.nickname} adlı kullanıcının profilini görüntülüyor
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-2 rounded-lg">
              Özel Mesaj Gönder
            </button>

            <Link
              to="/edit-profile"
              className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-lg font-semibold"
            >
              Profili Düzenle
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* İSTATİSTİK TIKLANABİLİR BUTONLAR */}
      {/* ====================================== */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center">
        <TabBox
          label="Konular"
          value={0}
          active={activeTab === "topics"}
          onClick={() => setActiveTab("topics")}
        />

        <TabBox
          label="Mesajlar"
          value={user.stats.played || 0}
          active={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
        />

        <TabBox
          label="Beğeniler"
          value={user.stats.win || 0}
          active={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}
        />

        <TabBox
          label="Takipçi"
          value={user.stats.followers || 0}
          active={activeTab === "followers"}
          onClick={() => setActiveTab("followers")}
        />

        <TabBox
          label="Takip Edilen"
          value={user.stats.following || 0}
          active={activeTab === "following"}
          onClick={() => setActiveTab("following")}
        />
      </div>

      {/* ====================================== */}
      {/* KULLANICI BİLGİLERİ */}
      {/* ====================================== */}
      <div
        className="
          bg-white dark:bg-[#1E293B]
          p-6 rounded-xl shadow space-y-3
          border border-slate-200 dark:border-gray-700
        "
      >
        <InfoRow label="Forum Yaşı" value={forumAge} />
        <InfoRow label="Cinsiyet" value={user.gender} />
        <InfoRow
          label="Doğum Yılı"
          value={`${user.birthYear} (${age} yaşında)`}
        />
        <InfoRow label="E-posta" value={user.email} />
        <InfoRow label="Son Ziyaret" value="Bilinmiyor" />
        <InfoRow label="Alınan Yorumlar" value="0" />
        <InfoRow label="Toplam Görüntülenme" value="0" />
      </div>

      {/* ====================================== */}
      {/* DİNAMİK İÇERİK ALANI */}
      {/* ====================================== */}
      <div
        className="
          bg-white dark:bg-[#1E293B]
          p-6 rounded-xl shadow
          border border-slate-200 dark:border-gray-700
        "
      >
        {activeTab === "topics" && <TopicList />}
        {activeTab === "messages" && <MessageList />}
        {activeTab === "likes" && <LikeList />}
        {activeTab === "followers" && <FollowerList />}
        {activeTab === "following" && <FollowingList />}
      </div>
    </div>
  );
}

/* ====================================== */
/* COMPONENTS */
/* ====================================== */

function TabBox({ label, value, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer p-4 rounded-xl shadow 
        transition border
        ${
          active
            ? "bg-orange-500 border-orange-400 text-black"
            : "bg-white dark:bg-[#1E293B] border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white"
        }
      `}
    >
      <p className="text-xl font-bold">{value}</p>
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

function getForumAge(createdAt) {
  const now = Date.now();
  const diff = now - createdAt;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 30) return `${days} gün`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay`;

  const years = Math.floor(months / 12);
  const remainMonths = months % 12;

  return `${years} yıl ${remainMonths} ay`;
}

function TopicList() {
  const topics = [
    {
      id: 1,
      title: "Fenerbahçe neden iyi oynayamıyor?",
      replies: 12,
      views: 350,
    },
    { id: 2, title: "Premier Lig tahminleri", replies: 4, views: 120 },
  ];

  if (topics.length === 0)
    return (
      <p className="text-slate-500 dark:text-gray-400">
        Bu kullanıcı hiç konu açmamış.
      </p>
    );

  return (
    <div className="space-y-3">
      {topics.map((t) => (
        <div
          key={t.id}
          className="
            p-4 rounded-lg flex justify-between items-center
            bg-slate-100 dark:bg-[#0F172A]
          "
        >
          <div>
            <p className="font-bold">{t.title}</p>
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              {t.replies} cevap • {t.views} görüntülenme
            </p>
          </div>

          <span className="text-slate-400 dark:text-gray-500">#{t.id}</span>
        </div>
      ))}
    </div>
  );
}

function MessageList() {
  const messages = [
    {
      id: 1,
      thread: "Lig maçları yorumları",
      text: "Bence hakem kötüydü.",
      date: "2 gün önce",
    },
    {
      id: 2,
      thread: "Transfer söylentileri",
      text: "Bu oyuncu gelirse çok iş yapar.",
      date: "5 gün önce",
    },
  ];

  if (messages.length === 0)
    return (
      <p className="text-slate-500 dark:text-gray-400">
        Bu kullanıcı hiç mesaj yazmamış.
      </p>
    );

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className="bg-slate-100 dark:bg-[#0F172A] p-4 rounded-lg"
        >
          <p className="text-sm text-slate-500 dark:text-gray-400">
            {m.thread}
          </p>
          <p className="font-medium mt-1">{m.text}</p>
          <p className="text-slate-400 dark:text-gray-500 text-xs mt-2">
            {m.date}
          </p>
        </div>
      ))}
    </div>
  );
}

function LikeList() {
  const likes = [
    {
      id: 1,
      text: "Manchester City çok formda, şampiyon olur.",
      author: "messi10",
    },
    {
      id: 2,
      text: "Galatasaray bu sene çok güçlü bir kadro kurdu.",
      author: "gsli1905",
    },
  ];

  if (likes.length === 0)
    return (
      <p className="text-slate-500 dark:text-gray-400">
        Bu kullanıcı hiçbir gönderiyi beğenmemiş.
      </p>
    );

  return (
    <div className="space-y-4">
      {likes.map((l) => (
        <div
          key={l.id}
          className="bg-slate-100 dark:bg-[#0F172A] p-4 rounded-lg"
        >
          <p className="font-semibold">{l.text}</p>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            — {l.author}
          </p>
        </div>
      ))}
    </div>
  );
}

function FollowerList() {
  const followers = [
    { id: 1, name: "emre45" },
    { id: 2, name: "ahmetx" },
  ];

  if (followers.length === 0)
    return (
      <p className="text-slate-500 dark:text-gray-400">Hiç takipçisi yok.</p>
    );

  return (
    <div className="space-y-2">
      {followers.map((f) => (
        <div
          key={f.id}
          className="
            bg-slate-100 dark:bg-[#0F172A]
            p-3 rounded-lg flex items-center gap-3
          "
        >
          <div className="w-10 h-10 bg-slate-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-white">
            {f.name.charAt(0).toUpperCase()}
          </div>
          <p>{f.name}</p>
        </div>
      ))}
    </div>
  );
}

function FollowingList() {
  const following = [
    { id: 1, name: "berkx" },
    { id: 2, name: "admin" },
  ];

  if (following.length === 0)
    return (
      <p className="text-slate-500 dark:text-gray-400">
        Hiçbir kullanıcıyı takip etmiyor.
      </p>
    );

  return (
    <div className="space-y-2">
      {following.map((f) => (
        <div
          key={f.id}
          className="
            bg-slate-100 dark:bg-[#0F172A]
            p-3 rounded-lg flex items-center gap-3
          "
        >
          <div className="w-10 h-10 bg-slate-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-white">
            {f.name.charAt(0).toUpperCase()}
          </div>
          <p>{f.name}</p>
        </div>
      ))}
    </div>
  );
}
