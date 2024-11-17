import React, { CSSProperties, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useMount from "./../../hooks/useMount";
import styles from "./../../styles/Modal.module.scss";
import IconButton from "./../iconButton";
import { ReactComponent as CloseIcon } from "./../../assets/icons/close.svg";
import classNames from "classnames";
import { animated, useTransition } from "@react-spring/web";

export type ModalProps = {
  show?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  bodyClassName?: string;
  clickableContainer?: boolean;
  withoutClose?: boolean;
  onClick?: () => void;
  bodyStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  fullcreen?: boolean;
  modalClassName?: string;
  Header?: React.FC<any>;
};

export type ModalContainerProps = {
  show: boolean;
  onClose: () => void;
};

function Modal({
  show,
  onClose,
  children,
  title,
  bodyClassName,
  clickableContainer,
  withoutClose,
  onClick,
  bodyStyle,
  containerStyle,
  modalClassName,
  fullcreen,
  Header,
}: ModalProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const mounted = useMount();

  useEffect(() => {
    container.current = document.querySelector("#modal");
  }, []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const transition = useTransition(
    mounted && container.current && show ? container.current : null,
    {
      from: { opacity: 0, y: -100 },
      leave: { opacity: 0, y: -100 },
      enter: {
        scale: 1,
        opacity: 1,
        y: 0,
      },
      config: {
        tension: 250,
        friction: 18,
      },
    }
  );

  return transition(
    ({ opacity, y }, _container) =>
      _container &&
      ReactDOM.createPortal(
        <animated.div
          className={`${styles.container} ${
            fullcreen ? "" : ""
          } transition-all duration-300`}
          style={{ opacity, ...containerStyle }}
          onClick={() => clickableContainer && handleClose()}
        >
          <animated.div
            className={` ${
              fullcreen
                ? "w-[100vw] h-[100vh] m-0 rounded-none"
                : "m-4 rounded-2xl"
            } ${modalClassName} ${styles.modal}`}
            style={{ opacity, y }}
            onClick={(e) => {
              if (onClick) onClick();
              e.stopPropagation();
            }}
          >
            <div className={styles.header}>
              <p className={styles.title}>{title}</p>
              <div className="flex items-center gap-2">
                {Header && <Header />}
                {!withoutClose && (
                  <IconButton sm={true} onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            </div>
            <div
              className={classNames(styles.body, {
                [`${bodyClassName}`]: bodyClassName,
              })}
              style={bodyStyle}
            >
              {children}
            </div>
          </animated.div>
        </animated.div>,
        _container
      )
  );
}

export default Modal;
