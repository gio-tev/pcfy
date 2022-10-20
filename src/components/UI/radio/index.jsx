import styles from './Radio.module.css';
import errorImage from '../../../assets/error-image.png';

const Radio = ({
  value,
  identifierOne,
  identifierTwo,
  validate,
  labelTitle,
  formHasError,
  handleInputs,
  handleClick,
  name,
}) => {
  return (
    <div className={`${styles.labelInputContainer} `}>
      <label
        className={`${styles.label} ${formHasError && validate(value) ? styles.error : undefined}`}
      >
        <div className={styles.memoryTypeTitleContainer}>
          {labelTitle}
          {formHasError && validate(value) && (
            <img src={errorImage} alt="noImage" className={styles.noMemoryType} />
          )}
        </div>
      </label>

      <div className={styles.radioContainer}>
        <div className={styles.radioLabelInputContainer}>
          <input
            style={styles.Input}
            onChange={handleInputs.bind(this, `${identifierOne}`)}
            onClick={handleClick}
            type="radio"
            name={name}
            checked={value === `${identifierOne}` || value === 'new' ? true : false}
            id={identifierOne}
          />
          <label htmlFor={identifierOne} className={styles.label}>
            {identifierOne}
          </label>
        </div>

        <div className={styles.radioLabelInputContainer}>
          <input
            style={styles.Input}
            onChange={handleInputs.bind(this, `${identifierTwo}`)}
            onClick={handleClick}
            type="radio"
            name={name}
            checked={value === `${identifierTwo}` || value === 'used' ? true : false}
            id={identifierTwo}
          />
          <label htmlFor={identifierTwo} className={styles.label}>
            {identifierTwo}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Radio;
