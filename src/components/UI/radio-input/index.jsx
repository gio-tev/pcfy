import styles from './RadioInput.module.css';
import errorImage from '../../../assets/error-image.png';

const RadioInput = ({
  value,
  identifierOne,
  identifierTwo,
  validator,
  labelTitle,
  hasError,
  onCheck,
  name,
}) => {
  return (
    <div className={`${styles.labelInputContainer} `}>
      <label
        className={`${styles.label} ${
          validator(value, hasError) ? styles.error : undefined
        }`}
      >
        <div className={styles.memoryTypeTitleContainer}>
          {labelTitle}
          {validator(value, hasError) && (
            <img src={errorImage} alt="no image" className={styles.noMemoryType} />
          )}
        </div>
      </label>

      <div className={styles.radioContainer}>
        <div className={styles.radioLabelInputContainer}>
          <input
            style={styles.Input}
            onChange={onCheck.bind(this, `${identifierOne}`)}
            type="radio"
            name={name}
            checked={value === `${identifierOne}` || value === 'new' ? true : false}
          />
          <label className={styles.label}>{identifierOne}</label>
        </div>

        <div className={styles.radioLabelInputContainer}>
          <input
            style={styles.Input}
            onChange={onCheck.bind(this, `${identifierTwo}`)}
            type="radio"
            name={name}
            checked={value === `${identifierTwo}` || value === 'used' ? true : false}
          />
          <label className={styles.label}>{identifierTwo}</label>
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
