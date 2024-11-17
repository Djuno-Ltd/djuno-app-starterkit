import React, { useCallback, useMemo, useState } from "react";
import { calcTextWidth } from "../utils/helper";
// import styles from "./../styles/IconButton.module.scss";

export type IconButtonProps = {
  children: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
  primary?: boolean;
  className?: string;
  sm?: boolean;
  rounded?: boolean;
  white?: boolean;
  warning?: boolean;
  activeColor?: string;
  switchable?: boolean;
  defalutValue?: boolean;
  resetDeps?: any;
  active?: boolean;
  label?: string;
  disable?: boolean;
};
function IconButton({
  children,
  onClick,
  primary,
  className,
  sm,
  white,
  rounded,
  warning,
  switchable,
  defalutValue,
  activeColor,
  active,
  onClickCapture,
  label,
  disable,
}: IconButtonProps) {
  const [_active, setActive] = useState(switchable && !!defalutValue);
  const [hover, setHover] = useState(false);

  const textSize = useMemo(() => {
    if (!label) return 0;
    return calcTextWidth(label, "bold 0.9rem Poppins") + 8;
  }, [label]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (switchable) setActive((prev) => !prev);
      if (onClick) onClick(e);
      if (onClickCapture) onClickCapture(e);
    },
    [onClick, onClickCapture, switchable]
  );

  return (
    <div
      className={`min-w-[36px] h-9 flex justify-center items-center rounded-lg cursor-pointer hover:scale-110 transition-all duration-300
      ${className}
      ${
        primary ||
        ((_active || (active !== undefined && active)) &&
          activeColor === "primary")
          ? "text-sky-600 hover:bg-sky-100"
          : ""
      }
      ${
        disable ||
        ((_active || (active !== undefined && active)) &&
          activeColor === "primary")
          ? "text-sky-600 hover:bg-sky-100"
          : ""
      }
      ${
        warning ||
        ((_active || (active !== undefined && active)) &&
          activeColor === "warning")
          ? "text-red-500 hover:bg-red-100"
          : ""
      }
      ${
        white ||
        ((_active || (active !== undefined && active)) &&
          activeColor === "white")
          ? "text-white hover:bg-slate-500"
          : ""
      }
      ${_active || (active !== undefined && active) ? "" : ""}

      ${sm ? "min-w-[32px] h-8" : ""}
      ${rounded ? "rounded-full" : ""}
      `}
      {...(onClick && { onClick: handleClick })}
      {...(onClickCapture && { onClickCapture: handleClick })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-center">{children}</div>
      <p
        className="whitespace-nowrap overflow-hidden text-[0.9rem] transition-all delay-400"
        style={{
          width: hover ? textSize : 0,
          opacity: hover ? 1 : 0,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default IconButton;
