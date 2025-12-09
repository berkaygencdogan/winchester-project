import ForumListItem from "../components/ForumListItem";

export default function AdminFeed() {
  const data = [
    {
      title: "ADMIN • Bu haftanın kuponu (yüksek oran)",
      username: "Admin",
      date: "Bugün",
      category: "Admin Kuponları",
      replies: 4,
      views: 451,
      lastActivity: "12 dakika önce",
      lastUser: "Admin",
      lastUserInitial: "A",
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
