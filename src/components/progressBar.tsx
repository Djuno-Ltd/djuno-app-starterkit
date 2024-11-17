import React from "react";
import styles from "./../styles/ProgressBar.module.scss";

export type ProgressBarProps = {
  total?: number;
  done?: number;
  draft?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ style, done, total, draft }, ref) => {
    let width: number | undefined = 0;
    if (total === 0) {
      draft ? (width = 0) : (width = 100);
    } else if (total !== undefined && done !== undefined) {
      width = (done / total) * 100;
    } else {
      width = undefined;
    }
    return (
      <div style={style} ref={ref} className={styles.progressBox}>
        <div className={styles.progress}>
          <span style={{ width: width + "%" }}>
            {width && width > 20 ? (
              <>
                {width
                  .toFixed(1)
                  .toString()
                  .replace(/\.?0+$/, "") + "%"}
              </>
            ) : null}
          </span>
        </div>

        <div className={styles.steps}>
          {total !== 0 && (
            <>
              <span className={styles.done}>{done}</span>/<span>{total}</span>
            </>
          )}
          {total === 0 && (
            <span
              data-tooltip-id="primary-tooltip"
              data-tooltip-content="No Signer"
              className="text-sm cursor-pointer"
            >
              NS
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default ProgressBar;
