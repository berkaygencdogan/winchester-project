import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        }
      );
    }
  };

  const sendOtp = async () => {
    if (!phone.startsWith("+90")) {
      setMessage("Telefon numarasını +90 formatında gir 📱");
      return;
    }
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      // 🔧 sadece await kullan
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setConfirmation(confirmationResult); // artık doğru şekilde set ediliyor
      setMessage("Doğrulama kodu gönderildi 📲");
    } catch (error) {
      console.error("OTP hatası:", error);
      setMessage("SMS gönderilirken hata oluştu ❌");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;

      // ✅ Backend’e kaydet
      await fetch("http://localhost:5000/api/users/registerOrLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, phone: user.phoneNumber }),
      });

      setMessage("Giriş başarılı ✅");

      // ✅ Kullanıcı state Firebase'den güncellensin
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("Kod yanlış veya süresi doldu ❌");
    }
  };

  return (
    <div className="text-center mt-10">
      <h1>Telefon ile Giriş</h1>
      <input
        placeholder="+905551112233"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded w-60"
      />
      <button
        onClick={sendOtp}
        className="bg-blue-600 text-white p-2 ml-2 rounded"
      >
        Kod Gönder
      </button>

      {confirmation && (
        <div className="mt-3">
          <input
            placeholder="Doğrulama kodu"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 rounded w-60"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white p-2 ml-2 rounded"
          >
            Onayla
          </button>
        </div>
      )}

      <p className="mt-3">{message}</p>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Login;
