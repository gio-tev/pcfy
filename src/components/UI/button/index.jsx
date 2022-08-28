import styles from './Button.module.css';

const Button = ({ children, className, onClick }) => (
  <button
    className={`${styles.btnPrimarty} ${className}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
