export default function CommentList({ comments }) {
  return (
    <div className="space-y-2 mt-2 text-slate-800 dark:text-white">
      {comments.map((c, i) => (
        <div
          key={i}
          className="
            rounded-lg p-3 text-sm transition
            bg-white border border-slate-200
            dark:bg-[#0F172A] dark:border-gray-700
          "
        >
          <span className="font-semibold text-slate-900 dark:text-white">
            {c.user}:
          </span>

          <span className="ml-1 text-slate-700 dark:text-gray-300">
            {c.text}
          </span>
        </div>
      ))}
    </div>
  );
}
