import styles from './Input.module.css';

const Input = ({ className, ...props }) => {
  return (
    <div className={styles.contaier}>
      <input
        className={`${styles.input} ${className}`}
        //   type={type}
        //   onChange={onChange}
        //   value={value}
        {...props}
      />
    </div>
  );
};

export default Input;
