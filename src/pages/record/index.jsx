import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './Record.module.css';
import Button from '../../components/UI/button';
import useFetch from '../../hooks/useFetch';
import arrowBack from '../../assets/arrow-back.png';

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

  // const image = response.data && response.data[0] && response.data[0]?.laptop.image;
  const image = response?.data?.laptop?.image;
  console.log(image, '........');
  return (
    <div className={styles.container}>
      <div className={styles.btnTitleContainer}>
        <Button onClick={handleGoBackClick} className={styles.btnBack}>
          <img src={arrowBack} alt="arrow back" />
        </Button>
        <h1 className={styles.title}>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h1>
      </div>

      <div className={styles.recordContainer}>
        <div className={styles.employeeInformationContainer}>
          <img
            src={`https://pcfy.redberryinternship.ge${image}`}
            alt="laptop"
            className={styles.img}
          />

          <div className={styles.employeeInformation}>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>სახელი:</span>
              <span className={styles.value}>{'hhhh'}</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>თიმი:</span>
              <span className={styles.value}>{'hhhhh'}</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>პოზიცია:</span>
              <span className={styles.value}>{'hhhhh'}</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>მეილი:</span>
              <span className={styles.value}>{'hhhhh'}</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>ტელ. ნომერი:</span>
              <span className={styles.value}>{'hhhhh'}</span>
            </div>
          </div>
        </div>

        <div className={styles.laptopInformationContainer}>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>ლეპტოპის სახელი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>ლეპტოპის ბრენდი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>RAM:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>მეხსიერების ტიპი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>CPU:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>CPU-ს ბირთვი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>CPU-ს ნაკადი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
        </div>

        <div className={styles.laptopInformationContainer}>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>ლეპტოპის მდგომარეობა:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>ლეპტოპის ფასი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
          {/* Conditionally */}
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>შეძენის რიცხვი:</span>
            <span className={styles.value}>{'hhhh'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
