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
    <div className="flex gap-2 mt-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="
    flex-1 px-3 py-2 rounded-lg outline-none
    bg-white text-slate-900 border border-slate-300
    dark:bg-[#0F172A] dark:text-white dark:border-gray-700
  "
        placeholder="Yorum yaz..."
      />
      <button className="bg-orange-600 px-4 rounded-lg" onClick={send}>
        Gönder
      </button>
    </div>
  );
}
