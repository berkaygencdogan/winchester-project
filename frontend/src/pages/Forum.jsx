import ForumTopicItem from "../components/ForumTopicItem";

export default function ForumPage() {
  const demoTopics = [
    {
      id: 1,
      title: "İnternetten nasıl harçlık çıkarıyorsunuz",
      author: "emre791",
      date: "23 Şub 2025",
      category: "Genel & Off Topic",
      replies: 5,
      views: 234,
      lastActivity: "59 dakika önce",
      lastUser: "AlegraJR",
    },
  ];

  return (
    <div className="max-w-[900px] mx-auto mt-6 space-y-4">
      {demoTopics.map((t) => (
        <ForumTopicItem key={t.id} topic={t} />
      ))}
    </div>
  );
}
