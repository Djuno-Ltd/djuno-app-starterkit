import classNames from "classnames";
import React, { forwardRef } from "react";
import styles from "./../styles/Input.module.scss";
import { ReactComponent as Logo } from "./../assets/icons/logo.svg";

export type InputProps = {
  fullWidth?: boolean;
  containerClassName?: string;
  textarea?: boolean;
  readonly?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const Input = forwardRef<HTMLDivElement, InputProps>(
  ({ fullWidth, containerClassName, textarea, value, type, ...props }, ref) => {
    return (
      <div
        className={classNames(styles.input, {
          [styles.fullWidth]: fullWidth,
          [containerClassName || ""]: containerClassName,
        })}
        ref={ref}
      >
        {textarea ? (
          <textarea {...props}>{value}</textarea>
        ) : (
          <>
            <input
              className={classNames({ [styles.djibType]: type === "djib" })}
              type={type === "djib" ? "number" : type}
              {...props}
              value={value}
            />
            {type === "djib" && (
              <div className={styles.djibUnit}>
                <Logo />

                <p>DJIB</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
