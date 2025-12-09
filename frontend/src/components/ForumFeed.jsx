import ForumListItem from "./ForumListItem";

export default function ForumFeed() {
  const data = [
    {
      title: "İnternetten nasıl harçlık çıkarıyorsunuz",
      username: "emre791",
      date: "23 Şub 2025",
      category: "Genel & Off Topic",
      replies: 5,
      views: 234,
      lastActivity: "59 dakika önce",
      lastUser: "AlegraJR",
      lastUserInitial: "A",
      avatar: null,
    },
    {
      title: "Shopier güvenli mi?",
      username: "fatihxPubg",
      date: "24 Şub 2025",
      category: "Genel & Off Topic",
      replies: 4,
      views: 294,
      lastActivity: "59 dakika önce",
      lastUser: "AlegraJR",
      lastUserInitial: "A",
      avatar: null,
    },
  ];

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <ForumListItem key={i} item={item} />
      ))}
    </div>
  );
}
