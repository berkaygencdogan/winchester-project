// src/components/LanguageSwitcher.jsx
import i18n from "../i18n";

export default function LanguageSwitcher() {
  const currentLang = i18n.language || "en";

  const languages = [
    "en",
    "tr",
    "de",
    "fr",
    "es",
    "ar",
    "ru",
    "pt",
    "it",
    "ja",
    "zh",
  ];

  return (
    <select
      className="
    p-2 rounded-md
    bg-white text-slate-800 border border-slate-300
    dark:bg-[#1E293B] dark:text-white dark:border-gray-700
  "
      value={currentLang}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("i18nextLng", e.target.value);
      }}
    >
      {languages.map((lng) => (
        <option key={lng} value={lng}>
          {lng.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
