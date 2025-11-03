import { useEffect, useState } from "react";

export const usePageVisible = () => {
  const [pageVisible, setPageVisible] = useState(
    typeof document !== "undefined"
      ? document.visibilityState === "visible"
      : true
  );

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return pageVisible;
};
