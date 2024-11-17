import classNames from "classnames";
import styles from "./../styles/Switch.module.scss";

export type SwitchProps = {
  active: boolean;
  onClick: () => void;
  label?: string;
};

function Switch({ active, onClick, label }: SwitchProps) {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.switch, { [styles.active]: active })}
        onClick={onClick}
      >
        <div />
      </div>
      {label && <p>{label}</p>}
    </div>
  );
}

export default Switch;
