import styles from './Select.module.css';

const Select = ({
  className,
  value,
  hasError,
  validator,
  handleInputs,
  identifier,
  defaultValue,
  data,
  team,
}) => {
  return (
    <select
      className={`${className} ${
        validator(value, hasError) ? styles.inputError : undefined
      } `}
      onChange={handleInputs.bind(this, `${identifier}`)}
      defaultValue="default"
      disabled={
        identifier === 'team' ? false : identifier === 'position' && team ? false : true
      }
    >
      <option value="default" disabled hidden>
        {value ? value : `${defaultValue}`}
      </option>

      {data &&
        data.response?.data.map(el => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}

      {data &&
        identifier === 'position' &&
        data.map(el => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}
    </select>
  );
};

export default Select;
