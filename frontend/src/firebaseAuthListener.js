import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const monitorAuth = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log("Kullanıcı oturumda:", user.phoneNumber);
    } else {
      setUser(null);
      console.log("Kullanıcı çıkış yaptı");
    }
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Kullanıcı çıkış yaptı ✅");
  } catch (error) {
    console.error("Çıkış hatası ❌", error);
  }
};
