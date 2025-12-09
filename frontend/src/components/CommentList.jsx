export default function CommentList({ comments }) {
  return (
    <div className="space-y-2 mt-2">
      {comments.map((c, i) => (
        <div key={i} className="bg-[#0F172A] rounded-lg p-2 text-sm">
          <span className="font-semibold">{c.user}: </span>
          {c.text}
        </div>
      ))}
    </div>
  );
}
