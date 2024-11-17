import { useCallback } from "react";

interface ScrollToTopHookOptions {
  behavior?: "auto" | "smooth";
  delay?: number;
}

const useScrollToTop = ({
  behavior = "auto",
  delay = 0,
}: ScrollToTopHookOptions = {}) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [behavior]);
  return scrollToTop;
};

export default useScrollToTop;
