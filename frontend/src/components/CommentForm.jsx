import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSubmit({
      user: "Misafir",
      text,
      date: Date.now(),
    });

    setText("");
  };

  return (
    <div className="flex gap-2 mt-3 text-slate-800 dark:text-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="
          flex-1 px-3 py-2 rounded-lg outline-none
          bg-white text-slate-900 border border-slate-300
          focus:border-orange-500
          dark:bg-[#0F172A] dark:text-white dark:border-gray-700
          dark:focus:border-orange-400
          transition
        "
        placeholder="Yorum yaz..."
      />

      <button
        onClick={send}
        className="
          px-4 rounded-lg font-semibold
          bg-orange-600 text-white
          hover:bg-orange-700
          active:scale-95
          transition
        "
      >
        Gönder
      </button>
    </div>
  );
}
