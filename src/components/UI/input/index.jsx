import styles from './Input.module.css';
import useWidth from '../../../hooks/useWidth';
import currency from '../../../assets/currency.png';

const Input = ({
  label,
  value,
  formHasError,
  handleInputs,
  handleFocus,
  validate,
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
        htmlFor={identifier}
        className={`${styles.label}  ${formHasError && validate(value) ? styles.error : undefined}`}
      >
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${className} ${
            formHasError && validate(value) ? styles.inputError : undefined
          }`}
          onChange={handleInputs.bind(this, `${identifier}`)}
          onFocus={handleFocus}
          value={value}
          placeholder={placeholder}
          id={identifier}
        />
        {identifier === 'laptop_price' && (
          <img className={styles.currency} src={currency} alt="gel" />
        )}
      </div>

      <p className={`${styles.hint} ${formHasError && validate(value) ? styles.error : undefined}`}>
        {!mobile && hintMessage}
        {mobile && identifier !== 'phone_number' && hintMessage}
        {mobile && identifier === 'phone_number' && changedHint}
      </p>
    </div>
  );
};

export default Input;
