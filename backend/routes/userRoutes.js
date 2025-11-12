import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Kullanıcı zaten varsa geri döner, yoksa oluşturur
router.post("/registerOrLogin", async (req, res) => {
  try {
    const { uid, phone } = req.body;

    if (!uid || !phone) {
      return res.status(400).json({ message: "Eksik veri" });
    }

    // Aynı UID veya telefon varsa mevcut kullanıcıyı getir
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, phone });
      await user.save();
      console.log("Yeni kullanıcı kaydedildi:", user.phone);
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Kullanıcı kaydı hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});

// Kullanıcı bilgilerini güncelle (benzersiz username kontrolü ile)
router.put("/update", async (req, res) => {
  try {
    const { uid, username, profileImage } = req.body;
    if (!uid) return res.status(400).json({ message: "UID gerekli" });

    // 🔹 Kullanıcı adı başka biri tarafından alınmış mı kontrol et
    if (username) {
      const existing = await User.findOne({ username, uid: { $ne: uid } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Bu kullanıcı adı zaten alınmış ⚠️",
        });
      }
    }

    // 🔹 Güncelleme işlemi
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { username, profileImage },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
});

// Belirli UID'li kullanıcıyı getir
router.get("/get/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    res.json({ success: true, user });
  } catch (error) {
    console.error("Kullanıcı getirme hatası:", error);
    res.status(500).json({ success: false });
  }
});

export default router;
