// src/pages/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/api";

const phoneRegex = /^[0-9]{10,15}$/;

const RegisterSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      phoneRegex,
      "Geçerli bir telefon numarası girin (sadece rakamlar)."
    )
    .required("Telefon zorunlu"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre zorunlu"),
  code: Yup.string().when("step", {
    is: "verify",
    then: Yup.string().required("Doğrulama kodu gerekli"),
  }),
});

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState("enter"); // enter -> doğrulama kodu bekleniyor -> done
  const [cooldown, setCooldown] = useState(0);
  const [serverMessage, setServerMessage] = useState("");
  const [mockMode, setMockMode] = useState(false); // backend yoksa test modu
  const [mockCode] = useState("1234"); // test kodu (sadece mock mod için)

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = () => setCooldown(60); // 60 saniye bekleme

  const sendCode = async (phone) => {
    setServerMessage("");
    try {
      const res = await api.post("/auth/send-code", { phone });
      // assume { success: true } on success
      if (res?.data?.success) {
        setMockMode(false);
        startCooldown();
        setStep("verify");
      } else {
        // fallback to mock
        setServerMessage(
          "Sunucudan beklenmeyen cevap. Test modu etkinleştiriliyor."
        );
        setMockMode(true);
        startCooldown();
        setStep("verify");
      }
    } catch (err) {
      // Eğer backend erişilemiyorsa fallback: mock mode
      console.warn("send-code hata:", err?.message || err);
      setServerMessage(
        "Backend erişilemedi — test modu etkinleştirildi. (Doğrulama kodu: 1234)"
      );
      setMockMode(true);
      startCooldown();
      setStep("verify");
    }
  };

  const verifyAndRegister = async ({ phone, code, password }) => {
    setServerMessage("");
    try {
      if (mockMode) {
        // Basit mock doğrulama
        if (code === mockCode) {
          // simule token + user
          const fakeToken = "fake-jwt-token";
          const fakeUser = {
            phone,
            username: phone.slice(-4),
            avatarUrl: null,
          };
          localStorage.setItem("token", fakeToken);
          localStorage.setItem("user", JSON.stringify(fakeUser));
          setServerMessage(
            "Kayıt başarılı (test modu). Yönlendiriliyorsunuz..."
          );
          setTimeout(() => navigate("/profile"), 800);
          return;
        } else {
          setServerMessage("Kod yanlış (test modu).");
          return;
        }
      }

      // Gerçek backend çağrısı
      const res = await api.post("/auth/verify-code", {
        phone,
        code,
        password,
      });

      if (res?.data?.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setServerMessage("Kayıt başarılı. Yönlendiriliyorsunuz...");
        setTimeout(() => navigate("/profile"), 800);
      } else {
        setServerMessage(res?.data?.message || "Doğrulama başarısız");
      }
    } catch (err) {
      console.error("verifyAndRegister err:", err);
      setServerMessage(
        err?.response?.data?.message ||
          "Sunucu hatası. Lütfen tekrar deneyin veya test modu kullanın."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Kayıt Ol</h2>

      <Formik
        initialValues={{ phone: "", password: "", code: "", step: "enter" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          if (step === "enter") {
            // telefon gönder -> SMS kodu tetikle
            await sendCode(values.phone);
          } else if (step === "verify") {
            await verifyAndRegister({
              phone: values.phone,
              code: values.code,
              password: values.password,
            });
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <Field
                name="phone"
                placeholder="5XXXXXXXXX veya uluslararası format"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Şifre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <Field
                name="password"
                type="password"
                placeholder="En az 6 karakter"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Eğer doğrulama adımındaysak: Kod alanı */}
            {step === "verify" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Doğrulama Kodu
                </label>
                <Field
                  name="code"
                  placeholder="Telefonunuza gelen 4 haneli kod"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>
            )}

            {/* Sunucu / bilgi mesajları */}
            {serverMessage && (
              <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {serverMessage}
              </div>
            )}

            {/* Butonlar */}
            <div className="flex gap-2">
              {step === "enter" && (
                <>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Kodu Gönder
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMockMode((m) => !m);
                      setServerMessage(
                        !mockMode
                          ? "Test modu etkin: Doğrulama kodu 1234"
                          : "Test modu kapatıldı"
                      );
                    }}
                    className="px-3 py-2 border rounded text-sm"
                  >
                    Test Modu
                  </button>
                </>
              )}

              {step === "verify" && (
                <>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Kodu Onayla & Kayıt Ol
                  </button>

                  <button
                    type="button"
                    disabled={cooldown > 0}
                    onClick={() => {
                      // resend code
                      if (!values.phone) {
                        setServerMessage("Önce telefon girin.");
                        return;
                      }
                      sendCode(values.phone);
                    }}
                    className={`px-3 py-2 rounded border text-sm ${
                      cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {cooldown > 0
                      ? `Tekrar gönder (${cooldown}s)`
                      : "Tekrar Gönder"}
                  </button>
                </>
              )}
            </div>

            {/* Debug: mock kodu göster (dev için) */}
            {mockMode && (
              <div className="text-xs text-gray-500">
                Test modu açık — doğrulama kodu:{" "}
                <span className="font-mono">{mockCode}</span>
              </div>
            )}
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center text-sm text-gray-600">
        Zaten hesabın var mı?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Giriş yap
        </a>
      </div>
    </div>
  );
}
