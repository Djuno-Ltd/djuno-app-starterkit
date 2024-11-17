import { useEffect, useState } from "react";

function useMount() {
  const [isMounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return isMounted;
}

export default useMount;
