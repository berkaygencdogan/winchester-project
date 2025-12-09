export function errorHandler(err, req, res, next) {
  console.error("🔥 SERVER ERROR:", err);

  // Firebase hataları özel formatlıdır
  if (err.code && err.message) {
    return res.status(400).json({
      error: err.message,
      code: err.code,
    });
  }

  // Express / diğer hatalar
  res.status(500).json({
    error: err.message || "Bilinmeyen sunucu hatası.",
  });
}
