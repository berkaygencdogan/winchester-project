export default function CommentList({ comments }) {
  return (
    <div className="space-y-2 mt-2">
      {comments.map((c, i) => (
        <div
          key={i}
          className="
    rounded-lg p-2 text-sm
    bg-white text-slate-800 border border-slate-200
    dark:bg-[#0F172A] dark:text-white dark:border-gray-700
  "
        >
          <span className="font-semibold">{c.user}: </span>
          {c.text}
        </div>
      ))}
    </div>
  );
}
