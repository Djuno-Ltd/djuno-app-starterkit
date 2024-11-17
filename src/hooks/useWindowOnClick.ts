import React, { useEffect } from "react";

function useWindowOnClick(
  callbackFn: (ev: MouseEvent) => any,
  deps: React.DependencyList,
  options: AddEventListenerOptions & { ignore?: Element[] } = {}
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        options.ignore?.some((el) => el.contains(target))
      ) {
        return;
      }
      callbackFn(event);
    };

    window.addEventListener("click", listener, options);
    return () => {
      window.removeEventListener("click", listener, options);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, ...(options.ignore || [])]);
}

export default useWindowOnClick;
