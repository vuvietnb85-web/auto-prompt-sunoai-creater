import { useEffect } from "react";

export function BrowserLock() {
  useEffect(() => {
    const block = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input[type="range"], input[type="file"]')) return;
      event.preventDefault();
    };
    const onKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      const key = event.key.toLowerCase();
      if (key === "a" || key === "c" || key === "x") event.preventDefault();
    };
    const opts = { capture: true } as const;
    document.addEventListener("copy", block, opts);
    document.addEventListener("cut", block, opts);
    document.addEventListener("contextmenu", block, opts);
    document.addEventListener("selectstart", block, opts);
    document.addEventListener("dragstart", block, opts);
    document.addEventListener("keydown", onKey, opts);
    return () => {
      document.removeEventListener("copy", block, opts);
      document.removeEventListener("cut", block, opts);
      document.removeEventListener("contextmenu", block, opts);
      document.removeEventListener("selectstart", block, opts);
      document.removeEventListener("dragstart", block, opts);
      document.removeEventListener("keydown", onKey, opts);
    };
  }, []);
  return null;
}
