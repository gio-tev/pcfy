import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './Record.module.css';
import Button from '../../components/UI/button';
import useFetch from '../../hooks/useFetch';

const Record = () => {
  const { response, sendHttp } = useFetch();

  console.log(response, 'response');
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    sendHttp(
      `${process.env.REACT_APP_GET_REGISTERED_LAPTOP}${id}?token=${process.env.REACT_APP_TOKEN}`
    );
  }, []);

  const handleGoBackClick = () => navigate(-1);
  return (
    <div className={styles.container}>
      <div className={styles.btnTitleContainer}>
        <Button onClick={handleGoBackClick} className={styles.btnBack}>
          <img src="" alt="arrow back" />
        </Button>
        <h1 className={styles.title}>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h1>
      </div>

      <div className={styles.employeeInformationContainer}>
        <img src="" alt="" />
        <div className={styles.employeeInformation}>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>სახელი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>თიმი:</span>
            <span className={styles.value}>{'hhhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>პოზიცია:</span>
            <span className={styles.value}>{'hhhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>მეილი:</span>
            <span className={styles.value}>{'hhhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>ტელ. ნომერი:</span>
            <span className={styles.value}>{'hhhhh'}</span>
          </div>
        </div>
      </div>

      <div className={styles.laptopInformationContainer}>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>ლეპტოპის სახელი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>ლეპტოპის ბრენდი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>RAM:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>მეხსიერების ტიპი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>CPU:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>CPU-ს ბირთვი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>CPU-ს ნაკადი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
      </div>

      <div className={styles.laptopInformationContainer}>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>ლეპტოპის მდგომარეობა:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>ლეპტოპის ფასი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
        {/* Conditionally */}
        <div className={styles.descriptionContainer}>
          <span className={styles.title}>შეძენის რიცხვი:</span>
          <span className={styles.value}>{'hhhh'}</span>
        </div>
      </div>
    </div>
  );
};

export default Record;
