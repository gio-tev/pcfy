import styles from './Label.module.css';

const Label = ({ children, className }) => (
  <label className={`${styles.label} ${className}`}>{children}</label>
);

export default Label;
