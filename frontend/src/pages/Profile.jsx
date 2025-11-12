import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: "", profileImage: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Firebase oturumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUser(currentUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchUser = async (uid) => {
    const res = await fetch(`http://localhost:5000/api/users/get/${uid}`);
    const data = await res.json();
    if (data.success) setProfile(data.user);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          username: profile.username,
          profileImage: profile.profileImage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Profil güncellendi ✅");
        setProfile(data.user);
      } else {
        setMessage("Güncelleme başarısız ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Sunucu hatası ❌");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  if (!user) {
    return <p className="text-center mt-20">Henüz giriş yapmadın 😕</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Profil Sayfası</h1>

      <img
        src={profile.profileImage || "https://picsum.photos/200"}
        alt="Profil"
        className="w-24 h-24 rounded-full mb-4 object-cover border"
      />

      <input
        type="text"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        className="border p-2 rounded mb-3 w-60 text-center"
        placeholder="Kullanıcı adı"
      />

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append("profileImage", file);

          const res = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.success) {
            setProfile({ ...profile, profileImage: data.url });
          }
        }}
        className="mb-3"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Güncelle
      </button>

      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  );
}

export default Profile;
