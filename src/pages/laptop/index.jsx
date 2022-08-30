import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

import styles from './Laptop.module.css';
import useFetch from '../../hooks/useFetch';
import Navigation from '../../components/UI/navigation';
import Button from '../../components/UI/button';
import arrowBack from '../../assets/arrow-back.png';
import Label from '../../components/UI/label';
import Input from '../../components/UI/input';
import logo from '../../assets/logo.png';
import noImage from '../../assets/no-image.png';
import checked from '../../assets/checked.png';

const Laptop = () => {
  const brands = useFetch(process.env.REACT_APP_GET_BRANDS);
  const cpus = useFetch(process.env.REACT_APP_GET_CPUS);

  const [image, setImage] = useState(null);
  const [imagePreviewData, setImagePreviewData] = useState({});
  const [userInputs, setUserInputs] = useState({});
  const [driveType, setDriveType] = useState('');
  const [laptopState, setLaptopState] = useState('');
  const [hasError, setHasError] = useState(false);
  // const [isFocued, setIsFocued] = useState({});

  const { imagePath, imageName, imageSize } = imagePreviewData;

  const {
    laptop_name,
    laptop_brand,
    laptop_cpu,
    laptop_cpu_cores,
    laptop_cpu_threads,
    laptop_ram,
    laptop_price,
  } = userInputs;

  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    const imagePath = URL.createObjectURL(acceptedFiles[0]);
    const imageName = acceptedFiles[0].name;
    const imageSize = (acceptedFiles[0].size / 1000000).toString().substring(0, 3);

    setImagePreviewData({ imagePath, imageName, imageSize });
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleInputs = (inputIdentifier, e) => {
    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleDriveTypeCheck = inputIdentifier => {
    setDriveType(inputIdentifier === 'SSD' ? 'SSD' : 'HDD');
  };

  const handleLaptopStateCheck = inputIdentifier => {
    setLaptopState(inputIdentifier === 'ახალი' ? 'ახალი' : 'მეორადი');
  };

  const handleFocus = inputFocused => {
    setHasError(false);
    // setIsFocued(prevState => {
    //   return { ...prevState, [inputFocused]: true };
    // });
  };

  // const handleBlur = inputBlurred => {
  //   setIsFocued(prevState => {
  //     return { ...prevState, [inputBlurred]: false };
  //   });
  // };

  const handleUploadAgain = () => setImage(null);

  const handleGoBackClick = () => {
    navigate('/employee');
  };

  const handleNextClick = () => {
    if (
      !image ||
      !laptop_name ||
      !/^[\w!@#$%^&*()+=]*$/.test(laptop_name) ||
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

    navigate('/success');
  };

  const laptopNameHasError = value =>
    hasError && (!value || !/^[\w!@#$%^&*()+=]*$/.test(value)) ? true : false;

  const selectUploadFieldHasError = value => (hasError && !value ? true : false);

  const numberInputHasError = value =>
    hasError && (!value || +value < 1 || !isFinite(value)) ? true : false;

  // const laptopImageHasError = value => (hasError && !value ? true : false);
  // const cpuThreadHasError = value => {};
  // const ramHasError = value => {};
  // const driveTypeHasError = value => (hasError && !value ? true : false);
  // const laptopStateHasError = value => {};
  // const laptopPriceHasError = value => {};

  // console.log(numberInputHasError(-45454, ';;;;;;;'));
  console.log(+'-55' < 1);
  // console.log(!isFinite('-55'));

  return (
    <div className={styles.container}>
      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        <img src={arrowBack} alt="arrow back" />
      </Button>

      <Navigation />

      <form className={styles.form}>
        {image && (
          <div className={styles.imagePreviewContainer}>
            <img src={imagePath} alt="img upload" className={styles.previewImage} />
            <div className={styles.prevDescriptionContainer}>
              <div className={styles.prevDescriptionInnerContainer}>
                <img
                  src={checked}
                  alt="img checked"
                  className={styles.previewImageChecked}
                />
                <p className={styles.imageName}>{imageName},</p>
                <p className={styles.imageSize}>{imageSize} mb</p>
              </div>
              <Button onClick={handleUploadAgain} className={styles.btnAgainNext}>
                თავიდან ატვირთე
              </Button>
            </div>
          </div>
        )}

        {!image && (
          <div {...getRootProps()}>
            <div
              className={`${styles.imageContainer} ${
                selectUploadFieldHasError(image) && styles.imageError
              }`}
            >
              <input {...getInputProps()} />

              <div className={styles.errorImageTitleContainer}>
                {selectUploadFieldHasError(image) && (
                  <img src={noImage} alt="no image" className={styles.noImage} />
                )}

                <p className={styles.uploadTitle}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
              </div>

              <Button className={styles.uploadBtn}>ატვირთე</Button>
            </div>
          </div>
        )}

        <div className={styles.laptopContainer}>
          {/* <div className={styles.laptopInnerContainer}> */}
          <div className={styles.labelInputContainer}>
            <Label className={laptopNameHasError(laptop_name) && styles.error}>
              ლეპტოპის სახელი
            </Label>
            <Input
              className={`${styles.inputs} ${
                laptopNameHasError(laptop_name) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_name')}
              onFocus={handleFocus.bind(this, 'laptop_name')}
              // onBlur={handleBlur.bind(this, 'laptop_name')}
            />

            <p
              className={`${styles.hint} ${
                laptopNameHasError(laptop_name) && styles.error
              }`}
            >
              ლათინური ასოები, ციფრები, !@#$%^&*()_+=
            </p>
          </div>
          <div className={styles.selectContainer}>
            <select
              className={`${styles.selectBrand} ${
                selectUploadFieldHasError(laptop_brand) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_brand')}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                ლეპტოპის ბრენდი
              </option>

              {brands.response?.data.map(brand => {
                return (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* </div> */}
        </div>

        <div className={styles.cpuContainer}>
          <div className={styles.selectContainer}>
            <select
              className={`${styles.selectCPU} ${
                selectUploadFieldHasError(laptop_cpu) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_cpu')}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                CPU
              </option>

              {cpus.response?.data.map(cpu => {
                return (
                  <option key={cpu.id} value={cpu.name}>
                    {cpu.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={numberInputHasError(laptop_cpu_cores) && styles.error}>
              CPU-ს ბირთვი
            </Label>
            <Input
              className={`${styles.cpuInputs} ${
                numberInputHasError(laptop_cpu_cores) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_cpu_cores')}
              onFocus={handleFocus.bind(this, 'laptop_cpu_cores')}
              // onBlur={handleBlur.bind(this, 'laptop_cpu_cores')}
            />

            <p
              className={`${styles.hint} ${
                numberInputHasError(laptop_cpu_cores) && styles.error
              }`}
            >
              მხოლოდ ციფრები
            </p>
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={numberInputHasError(laptop_cpu_threads) && styles.error}>
              CPU-ს ნაკადი
            </Label>
            <Input
              className={`${styles.cpuInputs} ${
                numberInputHasError(laptop_cpu_threads) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_cpu_threads')}
              onFocus={handleFocus.bind(this, 'laptop_cpu_threads')}
              // onBlur={handleBlur.bind(this, 'laptop_cpu_threads')}
            />

            <p
              className={`${styles.hint} ${
                numberInputHasError(laptop_cpu_threads) && styles.error
              }`}
            >
              მხოლოდ ციფრები
            </p>
          </div>
        </div>

        <div className={styles.ramContainer}>
          <div className={styles.labelInputContainer}>
            <Label className={numberInputHasError(laptop_ram) && styles.error}>
              ლეპტოპის RAM (GB)
            </Label>
            <Input
              className={`${styles.inputs} ${
                numberInputHasError(laptop_ram) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_ram')}
              onFocus={handleFocus.bind(this, 'laptop_ram')}
              // onBlur={handleBlur.bind(this, 'laptop_ram')}
            />
            <p
              className={`${styles.hint} ${
                numberInputHasError(laptop_ram) && styles.error
              }`}
            >
              მხოლოდ ციფრები
            </p>
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={selectUploadFieldHasError(driveType) && styles.error}>
              მეხსიერების ტიპი
            </Label>
            <div className={styles.radioContainer}>
              <div className={styles.radioLabelInputContainer}>
                <Input
                  onChange={handleDriveTypeCheck.bind(this, 'SSD')}
                  type="radio"
                  name="memoryType"
                />
                <Label>SSD</Label>
              </div>

              <div className={styles.radioLabelInputContainer}>
                <Input
                  onChange={handleDriveTypeCheck.bind(this, 'HDD')}
                  type="radio"
                  name="memoryType"
                />
                <Label>HDD</Label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.priceDateContainer}>
          <div className={styles.labelInputContainer}>
            <Label>შეძენის რიცხვი (არჩევითი)</Label>
            <Input
              className={styles.inputs}
              onChange={handleInputs.bind(this, 'laptop_purchase_date')}
            />
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={numberInputHasError(laptop_price) && styles.error}>
              ლეპტოპის ფასი
            </Label>
            <Input
              className={`${styles.inputs} ${
                numberInputHasError(laptop_price) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_price')}
              onFocus={handleFocus.bind(this, 'laptop_price')}
              // onBlur={handleBlur.bind(this, 'laptop_price ')}
            />

            <p
              className={`${styles.hint} ${
                numberInputHasError(laptop_price) && styles.error
              }`}
            >
              მხოლოდ ციფრები
            </p>
          </div>
        </div>

        <div className={styles.laptopStateContainer}>
          <div className={`${styles.labelInputContainer} ${styles.laptopState}`}>
            <Label className={selectUploadFieldHasError(laptopState) && styles.error}>
              ლეპტოპის მდგომარეობა
            </Label>
            <div className={styles.radioContainer}>
              <div className={styles.radioLabelInputContainer}>
                <Input
                  onChange={handleLaptopStateCheck.bind(this, 'ახალი')}
                  type="radio"
                  name="laptopState"
                />
                <Label>ახალი</Label>
              </div>

              <div className={styles.radioLabelInputContainer}>
                <Input
                  onChange={handleLaptopStateCheck.bind(this, 'მეორადი')}
                  type="radio"
                  name="laptopState"
                />
                <Label>მეორადი</Label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formBtnsContainer}>
          <Button onClick={handleGoBackClick} className={styles.formBtnBack}>
            უკან
          </Button>
          <Button onClick={handleNextClick} className={styles.btnAgainNext}>
            შემდეგი
          </Button>
        </div>
      </form>
      <img src={logo} alt="logo" className={styles.logo} />
    </div>
  );
};

export default Laptop;
