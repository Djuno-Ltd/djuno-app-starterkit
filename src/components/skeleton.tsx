import React from "react";
import styles from "./../styles/Skeleton.module.scss";
import classNames from "classnames";

export type SkeletonProps = {
  className?: string;
  width?: number;
  height?: number;
};

function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{ width, height }}
    />
  );
}

export default Skeleton;
