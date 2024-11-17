import React, { PropsWithChildren } from "react";

function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`ml-auto transition-all delay-200 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
