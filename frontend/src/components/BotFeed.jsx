import ForumListItem from "./ForumListItem";

export default function BotFeed() {
  const data = [
    {
      title: "BOT • Günün Maçı Tahmini: Beşiktaş - Galatasaray",
      username: "Bot",
      date: "Bugün",
      category: "Bot Analiz",
      replies: 3,
      views: 112,
      lastActivity: "5 dakika önce",
      lastUser: "Bot",
      lastUserInitial: "B",
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
