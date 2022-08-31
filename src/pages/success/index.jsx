import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Success.module.css';
import { AppContext } from '../../store';
import useFetch from '../../hooks/useFetch';
import successImage from '../../assets/success-image.png';
import Button from '../../components/UI/button';

const Success = () => {
  const { state } = useContext(AppContext);

  const fetch = useFetch();

  const navigate = useNavigate();

  const finalData = { ...state };

  for (const [key, value] of Object.entries(finalData)) {
    if (value === undefined) delete finalData[key];
  }

  const formData = new FormData();

  for (const name in finalData) {
    formData.append(name, finalData[name]);
  }

  useEffect(() => {
    fetch.sendHttp(process.env.REACT_APP_CREATE_LAPTOP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });
  }, []);

  if (fetch.error === null) {
    window.localStorage.clear();
  }

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
