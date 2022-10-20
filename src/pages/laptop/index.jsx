import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Laptop.module.css';
import useValidation from '../../hooks/useValidation';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSetIdsAndFilterPositions from '../../hooks/useSetIdsAndFilterPositions';
import FormHeader from '../../components/UI/form-header';
import Logo from '../../components/logo';
import Success from './success';
import ImageUpload from './image-upload';
import LaptopInputs from './laptop-inputs';
import LaptopPagination from './laptop-pagination';
import { laptopInitialState } from '../../utils/inputsInitialState';

const Laptop = () => {
  const brands = useFetch();
  const cpus = useFetch();

  const [userInputs, setUserInputs] = useLocalStorage('laptopData', laptopInitialState);
  const [imageDataURL] = useLocalStorage('laptopImage', '');

  const { setBrandId } = useSetIdsAndFilterPositions();
  const { laptopFormHasError } = useValidation();

  const [imageUploaded, setImageUploaded] = useState(false);
  const [formHasError, setFormHasError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const { laptop_brand } = userInputs;

  useEffect(() => {
    brands.sendHttp(process.env.REACT_APP_GET_BRANDS);
    cpus.sendHttp(process.env.REACT_APP_GET_CPUS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBrandId(brands, laptop_brand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laptop_brand]);

  const handleInputs = (inputIdentifier, e) => {
    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleDriveTypeCheck = inputIdentifier =>
    setUserInputs(prevState => {
      return { ...prevState, laptop_hard_drive_type: inputIdentifier === 'SSD' ? 'SSD' : 'HDD' };
    });

  const handleLaptopStateCheck = inputIdentifier =>
    setUserInputs(prevState => {
      return { ...prevState, laptop_state: inputIdentifier === 'ახალი' ? 'new' : 'used' };
    });

  const onImageUpload = () => setImageUploaded(true);

  const handleFocus = () => setFormHasError(false);
  const handleClick = () => setFormHasError(false);

  const handleGoBackClick = () => navigate('/employee');
  const handleNextClick = () =>
    laptopFormHasError(userInputs, imageDataURL, imageUploaded)
      ? setFormHasError(true)
      : setShowPopup(true);

  return (
    <>
      {showPopup && <Success />}

      {!showPopup && (
        <div className={styles.container}>
          <FormHeader handleGoBackClick={handleGoBackClick} className={styles.btnBack} />

          <form className={styles.form}>
            <ImageUpload formHasError={formHasError} onImageUpload={onImageUpload} />

            <LaptopInputs
              data={{
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
              }}
            />

            <LaptopPagination data={{ styles, handleGoBackClick, handleNextClick }} />
          </form>

          <Logo />
        </div>
      )}
    </>
  );
};

export default Laptop;
