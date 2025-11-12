import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const API_URL = "http://localhost:5000/api/comments";

  // 🔹 1️⃣ Yorumları çek
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(API_URL);
        setComments(res.data);
      } catch (err) {
        console.error("Yorumlar alınamadı:", err);
      }
    };
    fetchComments();
  }, []);

  // 🔹 2️⃣ Ana yorum ekle
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const res = await axios.post(API_URL, {
      username: "guest",
      text: newComment,
      parentId: null,
    });

    setComments([res.data, ...comments]);
    setNewComment("");
  };

  // 🔹 3️⃣ Yanıt ekle
  const handleAddReply = async (parentId) => {
    if (replyText.trim() === "") return;

    const res = await axios.post(API_URL, {
      username: "guest",
      text: replyText,
      parentId: parentId,
    });

    setComments([res.data, ...comments]);
    setReplyText("");
    setReplyTo(null);
  };

  // 🔹 4️⃣ Yorumları hiyerarşik (nested) sırala
  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <div
          key={c._id}
          className={`mt-4 border-l-2 ${
            level > 0 ? "ml-6 pl-3" : "pl-0"
          } border-gray-300 dark:border-gray-600`}
        >
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @{c.username} — <span className="text-xs">{c.date}</span>
            </p>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{c.text}</p>

            <button
              onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
              className="text-blue-600 dark:text-blue-400 text-sm mt-1 hover:underline"
            >
              {replyTo === c._id ? "Vazgeç" : "Yanıtla"}
            </button>

            {/* Yanıt kutusu */}
            {replyTo === c._id && (
              <div className="mt-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`@${c.username} kullanıcısına yanıt yaz...`}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
                />
                <button
                  onClick={() => handleAddReply(c._id)}
                  className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  Gönder
                </button>
              </div>
            )}

            {/* Alt yorumları (yanıtları) render et */}
            {renderComments(c._id, level + 1)}
          </div>
        </div>
      ));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Günün Sözü
      </h2>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-6">
        "Başarı, küçük adımların toplamıdır."
      </blockquote>

      {/* Ana yorum alanı */}
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Yorum yaz..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 resize-none"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Gönder
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Yorumlar
      </h3>

      <div>{renderComments()}</div>
    </div>
  );
}
