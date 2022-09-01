import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Success.module.css';
import { AppContext } from '../../store';
import useFetch from '../../hooks/useFetch';
import successImage from '../../assets/success-image.png';
import Button from '../../components/UI/button';
import useLocalStorage from '../../hooks/useLocalStorage';

const Success = () => {
  const { state } = useContext(AppContext);

  const [employeeData] = useLocalStorage('employeeData', {});
  const [teamPositionIds] = useLocalStorage('teamPositionIds', {});

  const [laptopData] = useLocalStorage('laptopData', {});
  const [driveType] = useLocalStorage('driveType', '');
  const [laptopState] = useLocalStorage('laptopState', '');
  const [laptopBrandId] = useLocalStorage('laptopBrandId', '');
  const [laptopImage] = useLocalStorage('laptopImage', '');

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (laptopImage) {
      const dataURLtoFile = async dataURL => {
        const res = await fetch(dataURL);
        const blob = await res.blob();
        const file = new File([blob], 'laptopImage.png', {
          type: "'image/png'",
          lastModified: new Date(),
        });
        setImageFile(file);
      };

      dataURLtoFile(laptopImage);
    }
  }, [laptopImage]);
  // useEffect(() => {
  //   const dataURLtoFile = dataURL => {
  //     fetch(dataURL)
  //       .then(res => res.blob())
  //       .then(blob => {
  //         const file = new File([blob], 'laptopImage.png', {
  //           type: "'image/png'",
  //           lastModified: new Date(),
  //         });
  //         setImageFile(file);
  //       })
  //       .catch(err => console.log(err));
  //   };

  //   dataURLtoFile(laptopImage);
  // }, []);

  const { sendHttp } = useFetch();

  const navigate = useNavigate();

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

  const isValidFormat = str => {
    if (
      /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        str
      )
    ) {
      return true;
    }
  };

  const ifDateInPast = str => {
    const dateString = str,
      dateArgs = dateString.match(/\d{2,4}/g),
      year = dateArgs[2],
      month = parseInt(dateArgs[1]) - 1,
      day = dateArgs[0];

    const milliseconds = new Date(year, month, day).getTime();

    return Date.now() > milliseconds;
  };

  if (
    finalData.laptop_purchase_date &&
    isValidFormat(finalData.laptop_purchase_date) &&
    ifDateInPast(finalData.laptop_purchase_date)
  ) {
    finalData.laptop_purchase_date = finalData.laptop_purchase_date.split('/').join('-');
  } else {
    delete finalData.laptop_purchase_date;
  }

  for (const [key, value] of Object.entries(finalData)) {
    if (
      value === undefined ||
      key === 'laptop_brand' ||
      key === 'team' ||
      key === 'position'
    )
      delete finalData[key];
  }

  const formData = new FormData();

  for (const name in finalData) {
    formData.append(name, finalData[name]);
  }
  console.log(finalData, 'finalData');

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
  }, [imageFile, employeeData.name]);

  // window.localStorage.clear(); // To be deleted

  const handleRecordsClick = () => navigate('/records');

  const handleLandingClick = () => navigate('/');

  return (
    <div className={styles.container}>
      <div className={styles.popupContainer}>
        <img src={successImage} alt="success" className={styles.img} />

        <p className={styles.title}>ჩანაწერი დამატებულია!</p>

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
