import { useEffect, useState } from "react";

export default function useAdblockDetector() {
  const [adblock, setAdblock] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        // Birçok AdBlock'un engellediği bilinen reklam URL'i
        const url =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);

        await fetch(url, { method: "HEAD", signal: controller.signal });

        clearTimeout(timeout);

        // Fetch başarılı ise AdBlock YOK
        setAdblock(false);
      } catch (err) {
        console.log(err);
        setAdblock(true);
      }
    }

    check();
  }, []);

  return adblock;
}
