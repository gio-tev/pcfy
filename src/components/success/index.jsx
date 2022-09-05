import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Success.module.css';
import useFetch from '../../hooks/useFetch';
import successImage from '../../assets/success-image.png';
import Button from '../UI/button';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWidth from '../../hooks/useWidth';
import useValidation from '../../hooks/useValidation';

const Success = () => {
  const mobile = useWidth();
  const { isValidFormat, isDateInPast } = useValidation();

  const [employeeData] = useLocalStorage('employeeData', {});
  const [teamPositionIds] = useLocalStorage('teamPositionIds', {});
  const [laptopData] = useLocalStorage('laptopData', {});
  const [driveType] = useLocalStorage('driveType', '');
  const [laptopState] = useLocalStorage('laptopState', '');
  const [laptopBrandId] = useLocalStorage('laptopBrandId', '');
  const [imageDataURL] = useLocalStorage('laptopImage', '');
  const [imagePreviewData] = useLocalStorage('imagePreviewData', {});

  const { sendHttp } = useFetch();
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (imageDataURL) {
      const dataURLtoFile = async dataURL => {
        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], `${imagePreviewData.imageName}`, {
          type: "'image/png'",
          lastModified: new Date(),
        });
        setImageFile(file);
      };

      dataURLtoFile(imageDataURL);
    }
  }, [imageDataURL, imagePreviewData.imageName]);

  useEffect(() => {
    if (imageFile && employeeData.name) {
      sendHttp(process.env.REACT_APP_CREATE_LAPTOP, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
    }

    return () => {
      window.localStorage.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, employeeData.name]);

  employeeData.email = employeeData.email.trim();
  employeeData.phone_number = employeeData.phone_number.trim();

  const finalData = {
    ...employeeData,
    ...teamPositionIds,
    ...laptopData,
    laptop_image: imageFile,
    laptop_hard_drive_type: driveType,
    laptop_state: laptopState,
    laptop_brand_id: laptopBrandId,
    token: process.env.REACT_APP_TOKEN,
  };

  if (
    finalData.laptop_purchase_date &&
    isValidFormat(finalData.laptop_purchase_date) &&
    isDateInPast(finalData.laptop_purchase_date)
  ) {
    finalData.laptop_purchase_date = finalData.laptop_purchase_date.split('/').join('-');
  } else {
    delete finalData.laptop_purchase_date;
  }

  for (const key in finalData) {
    if (key === 'laptop_brand' || key === 'team' || key === 'position')
      delete finalData[key];
  }

  const formData = new FormData();

  for (const key in finalData) {
    formData.append(key, finalData[key]);
  }

  const handleRecordsClick = () => navigate('/records');

  const handleLandingClick = () => navigate('/');

  return (
    <div className={styles.container}>
      <div className={styles.popupContainer}>
        <img src={successImage} alt="success" className={styles.img} />

        {mobile && (
          <div className={styles.title}>
            <div>ჩანაწერი</div>
            <div>დამატებულია!</div>
          </div>
        )}

        {!mobile && <h1 className={styles.title}>ჩანაწერი დამატებულია!</h1>}

        <div className={styles.btnContainer}>
          <Button className={styles.btnRecords} onClick={handleRecordsClick}>
            სიაში გადაყვანა
          </Button>

          <Button className={styles.btnLanding} onClick={handleLandingClick}>
            მთავარი
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
