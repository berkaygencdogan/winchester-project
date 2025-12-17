import fs from "fs";
import path from "path";

const CACHE_DIR = path.resolve("cache");
const META_FILE = path.join(CACHE_DIR, "_meta.json");
const MONTH_LIMIT = 100;

/* ================= UTIL ================= */

function ensureDir() {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);
}

function getMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/* ================= META ================= */

export function canUseApi() {
  ensureDir();

  if (!fs.existsSync(META_FILE)) {
    fs.writeFileSync(
      META_FILE,
      JSON.stringify({ month: getMonthKey(), used: 0 }, null, 2)
    );
  }

  const meta = JSON.parse(fs.readFileSync(META_FILE, "utf-8"));

  // Ay değiştiyse sıfırla
  if (meta.month !== getMonthKey()) {
    meta.month = getMonthKey();
    meta.used = 0;
  }

  if (meta.used >= MONTH_LIMIT) return false;

  meta.used += 1;
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));

  return true;
}

/* ================= FIXTURE CACHE ================= */

export function readFixtureCache(type, fixtureId) {
  ensureDir();
  const file = path.join(CACHE_DIR, `${type}_${fixtureId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeFixtureCache(type, fixtureId, status, data) {
  ensureDir();
  const file = path.join(CACHE_DIR, `${type}_${fixtureId}.json`);

  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        fixtureId,
        status,
        fetchedAt: new Date().toISOString(),
        data,
      },
      null,
      2
    )
  );
}
