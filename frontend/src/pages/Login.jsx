// frontend/src/pages/PhoneLogin.jsx
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

export default function PhoneLogin({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [smsCode, setSmsCode] = useState("");

  const [confirmation, setConfirmation] = useState(null);

  const sendCode = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      setCodeSent(true);
    } catch (err) {
      console.error(err);
      alert("SMS gönderilemedi");
    }
  };

  const verifyCode = async () => {
    try {
      const userCred = await confirmation.confirm(smsCode);
      const idToken = await userCred.user.getIdToken();

      const res = await axios.post(
        "http://localhost:5000/api/users/login-phone",
        {
          idToken,
        }
      );

      onLogin(res.data.user, res.data.token);
    } catch (err) {
      console.error(err);
      alert("Kod yanlış!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white">
      {!codeSent ? (
        <>
          <h2 className="text-xl mb-3">Telefon Numarası ile Giriş</h2>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+90 555 555 55 55"
            className="p-3 rounded bg-gray-800 w-full mb-3"
          />

          <button
            onClick={sendCode}
            className="w-full bg-orange-600 py-3 rounded font-bold"
          >
            SMS Gönder
          </button>

          <div id="recaptcha-container"></div>
        </>
      ) : (
        <>
          <h2 className="text-xl mb-3">SMS Kodunu Gir</h2>

          <input
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            placeholder="6 Haneli Kod"
            className="p-3 rounded bg-gray-800 w-full mb-3"
          />

          <button
            onClick={verifyCode}
            className="w-full bg-green-600 py-3 rounded font-bold"
          >
            Onayla
          </button>
        </>
      )}
    </div>
  );
}
