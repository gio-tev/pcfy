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

const Laptop = () => {
  const brands = useFetch(process.env.REACT_APP_GET_BRANDS);
  const cpus = useFetch(process.env.REACT_APP_GET_CPUS);

  const [image, setImage] = useState();
  const [userInputs, setUserInputs] = useState({});
  const [driveType, setDriveType] = useState('');
  const [laptopState, setLaptopState] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isFocued, setIsFocued] = useState({});

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

  const handleDriveTypeCheck = (inputIdentifier, e) => {
    setDriveType(inputIdentifier === 'SSD' ? 'SSD' : 'HDD');
  };

  const handleLaptopStateCheck = (inputIdentifier, e) => {
    setLaptopState(inputIdentifier === 'ახალი' ? 'ახალი' : 'მეორადი');
  };

  const handleFocus = inputFocused => {
    // setHasError(false);

    setIsFocued(prevState => {
      return { ...prevState, [inputFocused]: true };
    });
  };

  const handleBlur = inputBlurred => {
    setIsFocued(prevState => {
      return { ...prevState, [inputBlurred]: false };
    });
  };

  const handleGoBackClick = () => {
    navigate('/employee');
  };

  const handleNextClick = () => {
    if (
      !image ||
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

  const laptopNameHasError = value => {};
  const cpuCoreHasError = value => {};
  const cpuThreadHasError = value => {};
  const ramHasError = value => {};
  const memoryTypeHasError = () => {};
  const laptopStateHasError = () => {};
  const laptopPriceHasError = value => {};

  return (
    <div className={styles.container}>
      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        <img src={arrowBack} alt="arrow back" />
      </Button>

      <Navigation />

      <form className={styles.form}>
        <div {...getRootProps()}>
          <div className={styles.imageContainer}>
            <input {...getInputProps()} />
            <p className={styles.uploadTitle}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
            <Button className={styles.uploadBtn}>ატვირთე</Button>
          </div>
        </div>

        <div className={styles.laptopContainer}>
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
              onBlur={handleBlur.bind(this, 'laptop_name')}
            />
          </div>

          <div className={styles.selectContainer}>
            <select
              className={styles.selectBrand}
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
        </div>

        <div className={styles.cpuContainer}>
          <div className={styles.selectContainer}>
            <select
              className={styles.selectCPU}
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
            <Label className={cpuCoreHasError(laptop_cpu_cores) && styles.error}>
              CPU-ს ბირთვი
            </Label>
            <Input
              className={`${styles.cpuInputs} ${
                cpuCoreHasError(laptop_cpu_cores) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_cpu_cores')}
              onFocus={handleFocus.bind(this, 'laptop_cpu_cores')}
              onBlur={handleBlur.bind(this, 'laptop_cpu_cores')}
            />
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={cpuThreadHasError(laptop_cpu_threads) && styles.error}>
              CPU-ს ნაკადი
            </Label>
            <Input
              className={`${styles.cpuInputs} ${
                cpuThreadHasError(laptop_cpu_threads) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_cpu_threads')}
              onFocus={handleFocus.bind(this, 'laptop_cpu_threads')}
              onBlur={handleBlur.bind(this, 'laptop_cpu_threads')}
            />
          </div>
        </div>

        <div className={styles.ramContainer}>
          <div className={styles.labelInputContainer}>
            <Label className={ramHasError(laptop_ram) && styles.error}>
              ლეპტოპის RAM (GB)
            </Label>
            <Input
              className={`${styles.inputs} ${
                ramHasError(laptop_ram) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_ram')}
              onFocus={handleFocus.bind(this, 'laptop_ram')}
              onBlur={handleBlur.bind(this, 'laptop_ram')}
            />
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={memoryTypeHasError() && styles.error}>
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
            <Label className={laptopPriceHasError(laptop_price) && styles.error}>
              ლეპტოპის ფასი
            </Label>
            <Input
              className={`${styles.inputs} ${
                laptopPriceHasError(laptop_price) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'laptop_price ')}
              onFocus={handleFocus.bind(this, 'laptop_price ')}
              onBlur={handleBlur.bind(this, 'laptop_price ')}
            />
          </div>
        </div>

        <div className={styles.laptopStateContainer}>
          <div className={`${styles.labelInputContainer} ${styles.laptopState}`}>
            <Label className={laptopStateHasError() && styles.error}>
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
          <Button onClick={handleNextClick} className={styles.btnNext}>
            შემდეგი
          </Button>
        </div>
      </form>
      <img src={logo} alt="logo" className={styles.logo} />
    </div>
  );
};

export default Laptop;
