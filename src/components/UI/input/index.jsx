import styles from './Input.module.css';
import useWidth from '../../../hooks/useWidth';

const Input = ({
  label,
  value,
  hasError,
  handleInputs,
  handleFocus,
  validator,
  className,
  identifier,
  hintMessage,
  changedHint,
  placeholder,
}) => {
  const mobile = useWidth();

  return (
    <div className={styles.labelInputContainer}>
      <label
        className={`${styles.label} ${
          validator(value, hasError) ? styles.error : undefined
        }`}
      >
        {label}
      </label>
      <input
        className={`${styles.input} ${className} ${
          validator(value, hasError) ? styles.inputError : undefined
        }`}
        onChange={handleInputs.bind(this, `${identifier}`)}
        onFocus={handleFocus.bind(this, `${identifier}`)}
        value={value}
        placeholder={placeholder}
      />

      <p
        className={`${styles.hint} ${
          validator(value, hasError) ? styles.error : undefined
        }`}
      >
        {mobile && identifier === 'phone_number' && changedHint}
        {mobile && identifier !== 'phone_number' && hintMessage}
        {!mobile && hintMessage}
      </p>
    </div>
  );
};

export default Input;
