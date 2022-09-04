import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

import styles from './Laptop.module.css';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from '../../components/UI/button';
import dropImageMobile from '../../assets/drop-image-mobile.png';

import logo from '../../assets/logo.png';
import errorImage from '../../assets/error-image.png';
import checked from '../../assets/checked.png';
import Success from '../../components/success';
import useWidth from '../../hooks/useWidth';
import useValidation from '../../hooks/useValidation';
import FormHeader from '../../components/UI/form-header';
import Input from '../../components/UI/input';
import Select from '../../components/UI/select';
import RadioInput from '../../components/UI/radio-input';

const Laptop = () => {
  const mobile = useWidth();

  const brands = useFetch();
  const cpus = useFetch();

  const { laptopNameHasError, selectUploadFieldHasError, numberInputHasError } =
    useValidation();

  const [userInputs, setUserInputs] = useLocalStorage('laptopData', {
    laptop_name: '',
    laptop_brand: '',
    laptop_cpu: '',
    laptop_cpu_cores: '',
    laptop_cpu_threads: '',
    laptop_ram: '',
    laptop_price: '',
    laptop_purchase_date: '',
  });

  const [driveType, setDriveType] = useLocalStorage('driveType', '');
  const [laptopState, setLaptopState] = useLocalStorage('laptopState', '');
  const [laptopBrandId, setLaptopBrandId] = useLocalStorage('laptopBrandId', '');
  const [imageDataURL, setImageDataURL] = useLocalStorage('laptopImage', '');
  const [imagePreviewData, setImagePreviewData] = useLocalStorage('imagePreviewData', {});

  const [hasError, setHasError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { imageName, imageSize, imagePath } = imagePreviewData;

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
  }, []);

  const brandsData = brands.response?.data;

  useEffect(() => {
    if (laptop_brand) {
      const currentBrandObj = brands.response?.data.filter(
        value => value.name === laptop_brand
      );
      const laptopBrandId = currentBrandObj ? currentBrandObj[0]?.id : undefined;

      setLaptopBrandId(laptopBrandId);
    }
  }, [laptop_brand, brandsData]);

  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    const imagePath = URL.createObjectURL(acceptedFiles[0]);
    const imageName = acceptedFiles[0].name;
    const imageSize = (acceptedFiles[0].size / 1000000 + 0.1).toString().substring(0, 3);

    setImagePreviewData({ imageName, imageSize, imagePath });
    // setImage(acceptedFiles[0]);

    const reader = new FileReader();

    reader.onload = () => {
      setImageDataURL(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
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

  const handleDriveTypeCheck = inputIdentifier =>
    setDriveType(inputIdentifier === 'SSD' ? 'SSD' : 'HDD');

  const handleLaptopStateCheck = inputIdentifier =>
    setLaptopState(inputIdentifier === 'ახალი' ? 'new' : 'used');

  const handleFocus = () => setHasError(false);

  // const handleUploadAgain = () => setImage(null);
  const handleUploadAgain = () => setImageDataURL('');

  const handleGoBackClick = () => navigate('/employee');

  const handleNextClick = () => {
    if (
      !imageDataURL ||
      !laptop_name ||
      !/^[\w!@#$%^&*()+= ]*$/.test(laptop_name.trim()) ||
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

    // navigate('/success');
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && <Success />}

      {!showPopup && (
        <div className={styles.container}>
          <FormHeader handleGoBackClick={handleGoBackClick} className={styles.btnBack} />

          <form className={styles.form}>
            {imageDataURL && (
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
                  <Button onClick={handleUploadAgain} className={styles.btnAgain}>
                    თავიდან ატვირთე
                  </Button>
                </div>
              </div>
            )}

            {!imageDataURL && (
              <div {...getRootProps()}>
                <div
                  className={`${styles.imageContainer} ${
                    selectUploadFieldHasError(imageDataURL, hasError)
                      ? styles.imageError
                      : undefined
                  }`}
                >
                  <input {...getInputProps()} />

                  {!mobile && selectUploadFieldHasError(imageDataURL, hasError) && (
                    <>
                      <div className={styles.errorImageTitleContainer}>
                        <img src={errorImage} alt="no image" className={styles.noImage} />

                        <p className={styles.uploadTitle}>
                          ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                        </p>
                      </div>
                      <Button className={styles.uploadBtn}>ატვირთე</Button>
                    </>
                  )}

                  {!mobile && !selectUploadFieldHasError(imageDataURL, hasError) && (
                    <>
                      <p className={styles.uploadTitle}>
                        ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                      </p>
                      <Button className={styles.uploadBtn}>ატვირთე</Button>
                    </>
                  )}

                  {mobile && selectUploadFieldHasError(imageDataURL, hasError) && (
                    <div className={styles.errorImageTitleContainer}>
                      <img
                        src={dropImageMobile}
                        alt="drop"
                        className={styles.mobileDropIcon}
                      />
                      <p className={styles.uploadTitle}>ლეპტოპის ფოტოს ატვირთვა</p>

                      <img src={errorImage} alt="no image" className={styles.noImage} />
                    </div>
                  )}
                  {mobile && !selectUploadFieldHasError(imageDataURL, hasError) && (
                    <>
                      <img
                        src={dropImageMobile}
                        alt="drop"
                        className={styles.mobileDropIcon}
                      />

                      <p className={styles.uploadTitle}>ლეპტოპის ფოტოს ატვირთვა</p>
                    </>
                  )}
                </div>
              </div>
            )}

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
                <label className={styles.label}>შეძენის რიცხვი (არჩევითი)</label>
                <input
                  className={`${styles.input} ${styles.inputs}`}
                  onChange={handleInputs.bind(this, 'laptop_purchase_date')}
                  value={laptop_purchase_date}
                  placeholder="დდ / თთ / წწწწ"
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

{
  /* <div className={styles.labelInputContainer}>
                <Label
                  className={
                    laptopNameHasError(laptop_name, hasError) ? styles.error : undefined
                  }
                >
                  ლეპტოპის სახელი
                </Label>
                <Input
                  className={`${styles.inputs} ${
                    laptopNameHasError(laptop_name, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_name')}
                  onFocus={handleFocus.bind(this, 'laptop_name')}
                  value={laptop_name}
                />

                <p
                  className={`${styles.hint} ${
                    laptopNameHasError(laptop_name, hasError) ? styles.error : undefined
                  }`}
                >
                  ლათინური ასოები, ციფრები, !@#$%^&*()_+=
                </p>
              </div> */
}

{
  /* <div className={styles.selectContainer}> */
}
{
  /* <select
                  className={`${styles.selectBrand} ${
                    selectUploadFieldHasError(laptop_brand, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_brand')}
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    {laptop_brand ? laptop_brand : 'ლეპტოპის ბრენდი'}
                  </option>

                  {brands.response?.data.map(brand => {
                    return (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    );
                  })}
                </select> */
}

{
  /* <div className={styles.selectContainer}> */
}
{
  /* <select
                  className={`${styles.selectCPU} ${
                    selectUploadFieldHasError(laptop_cpu, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_cpu')}
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    {laptop_cpu ? laptop_cpu : 'CPU'}
                  </option>

                  {cpus.response?.data.map(cpu => {
                    return (
                      <option key={cpu.id} value={cpu.name}>
                        {cpu.name}
                      </option>
                    );
                  })}
                </select> */
}
{
  /* </div> */
}

{
  /* <div className={styles.labelInputContainer}>
                <Label
                  className={
                    numberInputHasError(laptop_cpu_cores, hasError)
                      ? styles.error
                      : undefined
                  }
                >
                  CPU-ს ბირთვი
                </Label>
                <Input
                  className={`${styles.cpuInputs} ${
                    numberInputHasError(laptop_cpu_cores, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_cpu_cores')}
                  onFocus={handleFocus.bind(this, 'laptop_cpu_cores')}
                  value={laptop_cpu_cores}
                />

                <p
                  className={`${styles.hint} ${
                    numberInputHasError(laptop_cpu_cores, hasError)
                      ? styles.error
                      : undefined
                  }`}
                >
                  მხოლოდ ციფრები
                </p>
              </div> */
}

{
  /* <div className={styles.labelInputContainer}>
                <Label
                  className={
                    numberInputHasError(laptop_cpu_threads, hasError)
                      ? styles.error
                      : undefined
                  }
                >
                  CPU-ს ნაკადი
                </Label>
                <Input
                  className={`${styles.cpuInputs} ${
                    numberInputHasError(laptop_cpu_threads, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_cpu_threads')}
                  onFocus={handleFocus.bind(this, 'laptop_cpu_threads')}
                  value={laptop_cpu_threads}
                />

                <p
                  className={`${styles.hint} ${
                    numberInputHasError(laptop_cpu_threads, hasError)
                      ? styles.error
                      : undefined
                  }`}
                >
                  მხოლოდ ციფრები
                </p>
              </div> */
}

{
  /* <div className={styles.labelInputContainer}>
                <Label
                  className={
                    numberInputHasError(laptop_ram, hasError) ? styles.error : undefined
                  }
                >
                  ლეპტოპის RAM (GB)
                </Label>
                <Input
                  className={`${styles.inputs} ${
                    numberInputHasError(laptop_ram, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_ram')}
                  onFocus={handleFocus.bind(this, 'laptop_ram')}
                  value={laptop_ram}
                />
                <p
                  className={`${styles.hint} ${
                    numberInputHasError(laptop_ram, hasError) ? styles.error : undefined
                  }`}
                >
                  მხოლოდ ციფრები
                </p>
              </div> */
}
{
  /* 
              <div className={styles.labelInputContainer}>
                <Label
                  className={
                    selectUploadFieldHasError(driveType, hasError)
                      ? styles.error
                      : undefined
                  }
                >
                  <div className={styles.memoryTypeTitleContainer}>
                    მეხსიერების ტიპი
                    {selectUploadFieldHasError(driveType, hasError) && (
                      <img
                        src={errorImage}
                        alt="no image"
                        className={styles.noMemoryType}
                      />
                    )}
                  </div>
                </Label>
                <div className={styles.radioContainer}>
                  <div className={styles.radioLabelInputContainer}>
                    <Input
                      onChange={handleDriveTypeCheck.bind(this, 'SSD')}
                      type="radio"
                      name="memoryType"
                      checked={driveType === 'SSD' ? true : false}
                    />
                    <Label>SSD</Label>
                  </div>

                  <div className={styles.radioLabelInputContainer}>
                    <Input
                      onChange={handleDriveTypeCheck.bind(this, 'HDD')}
                      type="radio"
                      name="memoryType"
                      checked={driveType === 'HDD' ? true : false}
                    />
                    <Label>HDD</Label>
                  </div>
                </div>
              </div> */
}

{
  /* <div className={styles.labelInputContainer}>
                <Label
                  className={
                    numberInputHasError(laptop_price, hasError) ? styles.error : undefined
                  }
                >
                  ლეპტოპის ფასი
                </Label>
                <Input
                  className={`${styles.inputs} ${
                    numberInputHasError(laptop_price, hasError)
                      ? styles.inputError
                      : undefined
                  }`}
                  onChange={handleInputs.bind(this, 'laptop_price')}
                  onFocus={handleFocus.bind(this, 'laptop_price')}
                  value={laptop_price}
                />

                <p
                  className={`${styles.hint} ${
                    numberInputHasError(laptop_price, hasError) ? styles.error : undefined
                  }`}
                >
                  მხოლოდ ციფრები
                </p>
              </div> */
}

{
  /* <div className={`${styles.labelInputContainer} ${styles.laptopState}`}>
                <Label
                  className={
                    selectUploadFieldHasError(laptopState, hasError)
                      ? styles.error
                      : undefined
                  }
                >
                  <div className={styles.memoryTypeTitleContainer}>
                    ლეპტოპის მდგომარეობა
                    {selectUploadFieldHasError(driveType, hasError) && (
                      <img
                        src={errorImage}
                        alt="no image"
                        className={styles.noMemoryType}
                      />
                    )}
                  </div>
                </Label>
                <div className={styles.radioContainer}>
                  <div className={styles.radioLabelInputContainer}>
                    <Input
                      onChange={handleLaptopStateCheck.bind(this, 'ახალი')}
                      type="radio"
                      name="laptopState"
                      checked={laptopState === 'new' ? true : false}
                    />
                    <Label>ახალი</Label>
                  </div>

                  <div className={styles.radioLabelInputContainer}>
                    <Input
                      onChange={handleLaptopStateCheck.bind(this, 'მეორადი')}
                      type="radio"
                      name="laptopState"
                      checked={laptopState === 'used' ? true : false}
                    />
                    <Label>მეორადი</Label>
                  </div>
                </div>
              </div> */
}
