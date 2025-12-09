import { auth, db } from "../firebase/firebaseAdmin.js";
import { UserModel } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const loginPhone = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const phone = decoded.phone_number;

    let user = await UserModel.getByUID(uid);
    if (!user) {
      user = await UserModel.create({
        uid,
        phone,
        nickname: null,
        username: null,
        birthYear: null,
        gender: null,
        avatar: null,
        bio: "",
        stats: {
          played: 0,
          win: 0,
          lose: 0,
          followers: 0,
          following: 0,
        },
        createdAt: new Date(),
      });
    }

    const token = generateToken(uid);

    res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Phone login failed" });
  }
};
