import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/api";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Geçerli bir telefon girin")
    .required("Telefon zorunlu"),
  password: Yup.string().required("Şifre zorunlu"),
});

export default function Login() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [mockMode, setMockMode] = useState(false);

  const handleLogin = async (values) => {
    setServerMessage("");

    try {
      if (mockMode) {
        // Test modu (backend yoksa)
        if (values.password === "123456") {
          const fakeToken = "fake-jwt-token";
          const fakeUser = {
            phone: values.phone,
            username: values.phone.slice(-4),
            avatarUrl: null,
          };
          localStorage.setItem("token", fakeToken);
          localStorage.setItem("user", JSON.stringify(fakeUser));
          setServerMessage("Giriş başarılı (test modu).");
          setTimeout(() => navigate("/profile"), 700);
        } else {
          setServerMessage("Yanlış şifre (test modu).");
        }
        return;
      }

      // Gerçek backend çağrısı
      const res = await api.post("/auth/login", values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setServerMessage("Giriş başarılı. Yönlendiriliyorsunuz...");
        setTimeout(() => navigate("/profile"), 700);
      } else {
        setServerMessage(res.data.message || "Giriş başarısız");
      }
    } catch (err) {
      console.error("Login error:", err);
      setServerMessage("Sunucuya bağlanılamadı, test modunu deneyebilirsin.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Giriş Yap</h2>

      <Formik
        initialValues={{ phone: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <Field
                name="phone"
                placeholder="5XXXXXXXXX"
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
                placeholder="Şifreniz"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {serverMessage && (
              <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {serverMessage}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Giriş Yap
              </button>

              <button
                type="button"
                onClick={() => {
                  setMockMode((m) => !m);
                  setServerMessage(
                    !mockMode
                      ? "Test modu açık: Şifre olarak 123456 gir."
                      : "Test modu kapatıldı."
                  );
                }}
                className="px-3 py-2 border rounded text-sm"
              >
                Test Modu
              </button>
            </div>

            <div className="mt-3 text-center text-sm text-gray-600">
              Hesabın yok mu?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Kayıt ol
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
