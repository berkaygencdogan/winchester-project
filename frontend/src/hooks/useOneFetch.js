import { useRef } from "react";

export function useOnceFetch() {
  const fetched = useRef({});

  function canFetch(key) {
    if (fetched.current[key]) return false;
    fetched.current[key] = true;
    return true;
  }

  return { canFetch };
}
