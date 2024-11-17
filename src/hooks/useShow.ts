import { useCallback, useState } from "react";

function useShow(initialValue: boolean = false, callback?: (d?: any) => void) {
  const [isShow, setShow] = useState(initialValue);

  const show = useCallback(
    (d?: any) => {
      setShow(true);
      callback && callback(d);
    },
    [callback]
  );

  const hide = useCallback(() => setShow(false), []);
  const toggle = useCallback(() => setShow((prev) => !prev), []);

  return [isShow, { show, hide, toggle }] as const;
}

export default useShow;
