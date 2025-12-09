import { useState, useContext } from "react";
import { sendOTP } from "../firebase/firebase";
import { verifyOTP } from "../services/authServices";
import { AuthContext } from "../context/AuthProvider";

export default function LoginModal({ onClose }) {
  const { setUser } = useContext(AuthContext);

  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    try {
      setLoading(true);
      const verId = await sendOTP(phone);
      setVerificationId(verId);
      setStep("otp"); // → OTP ekranına geç
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("OTP gönderilemedi");
      setLoading(false);
    }
  }

  async function handleVerify() {
    try {
      setLoading(true);

      const res = await verifyOTP(verificationId, code);

      setUser(res.user); // kullanıcıyı context'e aktar
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Kod doğrulanamadı");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] p-6 rounded-xl w-[350px] text-white">
        <h2 className="text-xl font-bold mb-4">Giriş Yap</h2>

        {step === "phone" && (
          <>
            <label className="text-sm mb-1 block">Telefon Numarası</label>
            <input
              type="text"
              placeholder="+905555555555"
              className="w-full px-3 py-2 rounded bg-[#0F172A] mb-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full bg-orange-600 py-2 rounded"
            >
              {loading ? "Gönderiliyor..." : "KOD GÖNDER"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <label className="text-sm mb-1 block">SMS Kodu</label>
            <input
              type="text"
              placeholder="123456"
              className="w-full px-3 py-2 rounded bg-[#0F172A] mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-600 py-2 rounded"
            >
              {loading ? "Doğrulanıyor..." : "GİRİŞ YAP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
