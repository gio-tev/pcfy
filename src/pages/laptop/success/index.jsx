import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Success.module.css';
import successImage from '../../../assets/success-image.png';
import Button from '../../../components/UI/button';
import useFetch from '../../../hooks/useFetch';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useWidth from '../../../hooks/useWidth';
import useValidation from '../../../hooks/useValidation';

const Success = () => {
  const mobile = useWidth();
  const navigate = useNavigate();
  const { sendHttp } = useFetch();
  const { isValidFormat, isDateInPast } = useValidation();
  const [imageFile, setImageFile] = useState(null);

  const [employeeData] = useLocalStorage('employeeData', {});
  const [laptopData] = useLocalStorage('laptopData', {});
  const [ids] = useLocalStorage('ids', {});
  const [imageDataURL] = useLocalStorage('laptopImage', '');
  const [imagePreviewData] = useLocalStorage('imagePreviewData', {});

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

    return () => window.localStorage.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, employeeData.name]);

  const finalData = {
    ...employeeData,
    ...laptopData,
    ...ids,
    laptop_image: imageFile,
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
    if (key === 'laptop_brand' || key === 'team' || key === 'position') delete finalData[key];
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
            <div>????????????????????????</div>
            <div>?????????????????????????????????!</div>
          </div>
        )}

        {!mobile && <h1 className={styles.title}>???????????????????????? ?????????????????????????????????!</h1>}

        <div className={styles.btnContainer}>
          <Button className={styles.btnRecords} onClick={handleRecordsClick}>
            ??????????????? ???????????????????????????
          </Button>

          <Button className={styles.btnLanding} onClick={handleLandingClick}>
            ?????????????????????
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
