import React, { useCallback, useState } from "react";
import styles from "./../styles/Button.module.scss";
import classNames from "classnames";
import Loading from "./loading";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => any | Promise<any>;
  onClickCapture?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => any | Promise<any>;
  className?: string;
  light?: boolean;
  borderButton?: boolean;
  extraLight?: boolean;
  active?: boolean;
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  withLoading?: boolean;
  isDisabled?: boolean;
  color?: "danger" | "primary" | "warn";
};

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      children,
      onClick,
      className,
      light,
      borderButton,
      extraLight,
      startIcon,
      active,
      fullWidth,
      style,
      withLoading,
      onClickCapture,
      isDisabled,
      color = "primary",
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const handleClick = useCallback(
      async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!onClick && !onClickCapture) return;
        const fn =
          onClick && !isDisabled
            ? onClick(e)
            : onClickCapture
            ? onClickCapture(e)
            : () => {};

        if (typeof fn?.then === "function") {
          setLoading(true);
          fn.then(() => {
            setLoading(false);
          }).catch(() => {
            setLoading(false);
          });
        }
      },
      [isDisabled, onClick, onClickCapture]
    );

    return (
      <div
        style={style}
        ref={ref}
        className={classNames(styles.button, styles[color], {
          [styles.light]: light,
          [styles.extraLight]: extraLight,
          [styles.borderButton]: borderButton,
          [styles.active]: active,
          [styles.fullWidth]: fullWidth,
          [styles.isDisabled]: isDisabled,
          [className || ""]: className,
        })}
        {...(onClick && { onClick: handleClick })}
        {...(onClickCapture && { onClickCapture: handleClick })}
      >
        {startIcon}
        {loading && withLoading ? (
          <Loading
            size={18}
            borderSize={2}
            color={extraLight || light ? "#0074e5" : "#fff"}
            borderColor={extraLight || light ? "#EBF5FF" : "#ffffff40"}
          />
        ) : (
          children
        )}
      </div>
    );
  }
);

Button.displayName = "Button";
export default Button;
