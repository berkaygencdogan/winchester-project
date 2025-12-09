import PostCard from "../components/PostCard";

export default function BotFeed() {
  const data = [
    {
      id: 1,
      type: "bot",
      author: { name: "Bot" },
      match: {
        league: "Süper Lig",
        homeTeam: "Beşiktaş",
        awayTeam: "Galatasaray",
        odds: { home: 2.1, draw: 3.1, away: 2.8 },
      },
      analysis: "Bot analizi: Bu maçta KG Var yüksek ihtimal...",
      comments: [],
    },
  ];

  return (
    <div className="space-y-6">
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
