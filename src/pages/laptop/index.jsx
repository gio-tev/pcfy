import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Laptop.module.css';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import useValidation from '../../hooks/useValidation';
import Button from '../../components/UI/button';
import logo from '../../assets/logo.png';
import Success from '../../components/success';
import FormHeader from '../../components/UI/form-header';
import Input from '../../components/UI/input';
import Select from '../../components/UI/select';
import RadioInput from '../../components/UI/radio-input';
import ImageUpload from '../../components/image-upload';

const initialState = {
  laptop_name: '',
  laptop_brand: '',
  laptop_cpu: '',
  laptop_cpu_cores: '',
  laptop_cpu_threads: '',
  laptop_ram: '',
  laptop_price: '',
  laptop_purchase_date: '',
};

const Laptop = () => {
  const brands = useFetch();
  const cpus = useFetch();

  const { laptopNameHasError, selectUploadFieldHasError, numberInputHasError } =
    useValidation();

  const [userInputs, setUserInputs] = useLocalStorage('laptopData', initialState);
  const [driveType, setDriveType] = useLocalStorage('driveType', '');
  const [laptopState, setLaptopState] = useLocalStorage('laptopState', '');
  const [, setLaptopBrandId] = useLocalStorage('laptopBrandId', '');
  const [imageDataURL] = useLocalStorage('laptopImage', '');

  const [hasError, setHasError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const navigate = useNavigate();

  const {
    laptop_name,
    laptop_brand,
    laptop_cpu,
    laptop_cpu_cores,
    laptop_cpu_threads,
    laptop_ram,
    laptop_price,
    laptop_purchase_date,
  } = userInputs;

  useEffect(() => {
    brands.sendHttp(process.env.REACT_APP_GET_BRANDS);
    cpus.sendHttp(process.env.REACT_APP_GET_CPUS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBrandId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laptop_brand]);

  const setBrandId = () => {
    if (laptop_brand) {
      const currentBrandObj = brands.response?.data.filter(
        value => value.name === laptop_brand
      );

      const laptopBrandId = currentBrandObj ? currentBrandObj[0]?.id : undefined;

      if (laptopBrandId) {
        setLaptopBrandId(laptopBrandId);
      }
    }
  };

  const handleInputs = (inputIdentifier, e) => {
    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleDriveTypeCheck = inputIdentifier =>
    setDriveType(inputIdentifier === 'SSD' ? 'SSD' : 'HDD');

  const handleLaptopStateCheck = inputIdentifier =>
    setLaptopState(inputIdentifier === 'ახალი' ? 'new' : 'used');

  const onImageUpload = () => setImageUploaded(true);

  const handleFocus = () => setHasError(false);

  const handleGoBackClick = () => navigate('/employee');

  const handleNextClick = () => {
    if (
      (!imageUploaded && !imageDataURL) ||
      laptop_name.trim().length === 0 ||
      !/^[\w!@#$%^&*()+=]*$/.test(laptop_name.trim()) ||
      !laptop_brand ||
      !laptop_cpu ||
      !laptop_cpu_cores ||
      !+laptop_cpu_cores > 0 ||
      !isFinite(laptop_cpu_cores) ||
      !laptop_cpu_threads ||
      !+laptop_cpu_threads > 0 ||
      !isFinite(laptop_cpu_threads) ||
      !laptop_ram ||
      !+laptop_ram > 0 ||
      !isFinite(laptop_ram) ||
      !driveType ||
      !laptopState ||
      !laptop_price ||
      !+laptop_price > 0 ||
      !isFinite(laptop_price)
    ) {
      return setHasError(true);
    }

    setShowPopup(true);
  };

  return (
    <>
      {showPopup && <Success />}

      {!showPopup && (
        <div className={styles.container}>
          <FormHeader handleGoBackClick={handleGoBackClick} className={styles.btnBack} />

          <form className={styles.form}>
            <ImageUpload hasError={hasError} onImageUpload={onImageUpload} />

            <div className={styles.laptopContainer}>
              <Input
                label="ლეპტოპის სახელი"
                value={laptop_name}
                hasError={hasError}
                handleInputs={handleInputs}
                handleFocus={handleFocus}
                validator={laptopNameHasError}
                className={styles.inputs}
                identifier="laptop_name"
                hintMessage="ლათინური ასოები, ციფრები, !@#$%^&*()_+="
              />

              <Select
                className={styles.selectBrand}
                value={laptop_brand}
                hasError={hasError}
                validator={selectUploadFieldHasError}
                handleInputs={handleInputs}
                identifier="laptop_brand"
                defaultValue="ლეპტოპის ბრენდი"
                data={brands}
              />
            </div>

            <div className={styles.cpuContainer}>
              <Select
                className={styles.selectCPU}
                value={laptop_cpu}
                hasError={hasError}
                validator={selectUploadFieldHasError}
                handleInputs={handleInputs}
                identifier="laptop_cpu"
                defaultValue="CPU"
                data={cpus}
              />

              <Input
                label="CPU-ს ბირთვი"
                value={laptop_cpu_cores}
                hasError={hasError}
                handleInputs={handleInputs}
                handleFocus={handleFocus}
                validator={numberInputHasError}
                className={styles.cpuInputs}
                identifier="laptop_cpu_cores"
                hintMessage="მხოლოდ ციფრები"
              />

              <Input
                label="CPU-ს ნაკადი"
                value={laptop_cpu_threads}
                hasError={hasError}
                handleInputs={handleInputs}
                handleFocus={handleFocus}
                validator={numberInputHasError}
                className={styles.cpuInputs}
                identifier="laptop_cpu_threads"
                hintMessage="მხოლოდ ციფრები"
              />
            </div>

            <div className={styles.ramContainer}>
              <Input
                label="ლეპტოპის RAM (GB)"
                value={laptop_ram}
                hasError={hasError}
                handleInputs={handleInputs}
                handleFocus={handleFocus}
                validator={numberInputHasError}
                className={styles.inputs}
                identifier="laptop_ram"
                hintMessage="მხოლოდ ციფრები"
              />

              <RadioInput
                value={driveType}
                identifierOne="SSD"
                identifierTwo="HDD"
                validator={selectUploadFieldHasError}
                labelTitle="მეხსიერების ტიპი"
                hasError={hasError}
                onCheck={handleDriveTypeCheck}
                name="memoryType"
              />
            </div>

            <div className={styles.priceDateContainer}>
              <div className={styles.labelInputContainer}>
                <label htmlFor="laptop_purchase_date" className={styles.label}>
                  შეძენის რიცხვი (არჩევითი)
                </label>
                <input
                  className={`${styles.input} ${styles.inputs}`}
                  onChange={handleInputs.bind(this, 'laptop_purchase_date')}
                  value={laptop_purchase_date}
                  placeholder="დდ / თთ / წწწწ"
                  id="laptop_purchase_date"
                />
              </div>

              <Input
                label="ლეპტოპის ფასი"
                value={laptop_price}
                hasError={hasError}
                handleInputs={handleInputs}
                handleFocus={handleFocus}
                validator={numberInputHasError}
                className={styles.inputs}
                identifier="laptop_price"
                hintMessage="მხოლოდ ციფრები"
              />
            </div>

            <div className={styles.laptopStateContainer}>
              <RadioInput
                value={laptopState}
                identifierOne="ახალი"
                identifierTwo="მეორადი"
                validator={selectUploadFieldHasError}
                labelTitle="ლეპტოპის მდგომარეობა"
                hasError={hasError}
                onCheck={handleLaptopStateCheck}
                name="laptopState"
              />
            </div>

            <div className={styles.formBtnsContainer}>
              <Button onClick={handleGoBackClick} className={styles.formBtnBack}>
                უკან
              </Button>
              <Button onClick={handleNextClick} className={styles.btnSave}>
                დამახსოვრება
              </Button>
            </div>
          </form>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
      )}
    </>
  );
};

export default Laptop;
