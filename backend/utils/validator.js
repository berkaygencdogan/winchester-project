// Türkçe karakter temizleme
export function normalizeUsername(str) {
  if (!str) return "";

  const map = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return str
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (m) => map[m])
    .replace(/\s+/g, "") // boşlukları sil
    .toLowerCase();
}

export const bannedWords = [
  "amk",
  "aq",
  "orospu",
  "sikerim",
  "piç",
  "sik",
  "got",
  "yarak",
  "am",
  "porno",
  "sex",
  "seks",
  "fuck",
  "bitch",
];

// Username küfür içeriyor mu kontrolü
export function containsBadWord(username) {
  const clean = username.toLowerCase();

  return bannedWords.some((w) => clean.includes(w));
}
