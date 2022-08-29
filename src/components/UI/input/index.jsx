import styles from './Input.module.css';

const Input = ({ className, ...props }) => {
  return (
    <div className={styles.contaier}>
      <input className={`${styles.input} ${className}`} {...props} />
    </div>
  );
};

export default Input;
