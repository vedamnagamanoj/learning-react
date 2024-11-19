import { useEffect } from "react";

export function useKey(key, type, action) {
  useEffect(() => {
    const closeDetails = (evnt) => {
      if (evnt.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener(type, closeDetails);

    return () => document.removeEventListener(type, closeDetails);
  }, [key, type, action]);
}
