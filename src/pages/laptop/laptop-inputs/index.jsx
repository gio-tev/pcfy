import Input from '../../../components/UI/input';
import Select from '../../../components/UI/select';
import Radio from '../../../components/UI/radio';
import useValidation from '../../../hooks/useValidation';

const LaptopInputs = ({
  data: {
    styles,
    formHasError,
    userInputs,
    handleFocus,
    handleClick,
    handleInputs,
    handleDriveTypeCheck,
    handleLaptopStateCheck,
    brands,
    cpus,
  },
}) => {
  const { laptopNameHasError, selectUploadFieldHasError, numberInputHasError } = useValidation();

  const {
    laptop_name,
    laptop_brand,
    laptop_cpu,
    laptop_cpu_cores,
    laptop_cpu_threads,
    laptop_ram,
    laptop_price,
    laptop_purchase_date,
    laptop_hard_drive_type,
    laptop_state,
  } = userInputs;

  return (
    <>
      <div className={styles.laptopContainer}>
        <Input
          label="ლეპტოპის სახელი"
          value={laptop_name}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={laptopNameHasError}
          className={styles.inputs}
          identifier="laptop_name"
          hintMessage="ლათინური ასოები, ციფრები, !@#$%^&*()_+="
        />

        <Select
          className={styles.selectBrand}
          value={laptop_brand}
          formHasError={formHasError}
          validate={selectUploadFieldHasError}
          handleInputs={handleInputs}
          handleClick={handleClick}
          identifier="laptop_brand"
          defaultValue="ლეპტოპის ბრენდი"
          data={brands}
        />
      </div>

      <div className={styles.cpuContainer}>
        <Select
          className={styles.selectCPU}
          value={laptop_cpu}
          formHasError={formHasError}
          validate={selectUploadFieldHasError}
          handleInputs={handleInputs}
          handleClick={handleClick}
          identifier="laptop_cpu"
          defaultValue="CPU"
          data={cpus}
        />

        <Input
          label="CPU-ს ბირთვი"
          value={laptop_cpu_cores}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={numberInputHasError}
          className={styles.cpuInputs}
          identifier="laptop_cpu_cores"
          hintMessage="მხოლოდ ციფრები"
        />

        <Input
          label="CPU-ს ნაკადი"
          value={laptop_cpu_threads}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={numberInputHasError}
          className={styles.cpuInputs}
          identifier="laptop_cpu_threads"
          hintMessage="მხოლოდ ციფრები"
        />
      </div>

      <div className={styles.ramContainer}>
        <Input
          label="ლეპტოპის RAM (GB)"
          value={laptop_ram}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={numberInputHasError}
          className={styles.inputs}
          identifier="laptop_ram"
          hintMessage="მხოლოდ ციფრები"
        />

        <Radio
          value={laptop_hard_drive_type}
          identifierOne="SSD"
          identifierTwo="HDD"
          validate={selectUploadFieldHasError}
          labelTitle="მეხსიერების ტიპი"
          formHasError={formHasError}
          handleInputs={handleDriveTypeCheck}
          handleClick={handleClick}
          name="memoryType"
        />
      </div>

      <div className={styles.purchaseDateContainer}>
        <div className={styles.labelInputContainer}>
          <label htmlFor="laptop_purchase_date" className={styles.label}>
            შეძენის რიცხვი (არჩევითი)
          </label>
          <input
            className={`${styles.input} ${styles.purchaseDateInput}`}
            onChange={handleInputs.bind(this, 'laptop_purchase_date')}
            value={laptop_purchase_date}
            placeholder="დდ / თთ / წწწწ"
            id="laptop_purchase_date"
          />
        </div>

        <Input
          label="ლეპტოპის ფასი"
          value={laptop_price}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={numberInputHasError}
          className={styles.inputs}
          identifier="laptop_price"
          hintMessage="მხოლოდ ციფრები"
        />
      </div>

      <div className={styles.laptopStateContainer}>
        <Radio
          value={laptop_state}
          identifierOne="ახალი"
          identifierTwo="მეორადი"
          validate={selectUploadFieldHasError}
          labelTitle="ლეპტოპის მდგომარეობა"
          formHasError={formHasError}
          handleInputs={handleLaptopStateCheck}
          handleClick={handleClick}
          name="laptopState"
        />
      </div>
    </>
  );
};

export default LaptopInputs;
