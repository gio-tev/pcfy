import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Records.module.css';
import Button from '../../components/UI/button';
import arrowBack from '../../assets/arrow-back.png';
import useFetch from '../../hooks/useFetch';

const Records = () => {
  const { response, sendHttp } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    sendHttp(`${process.env.REACT_APP_GET_LAPTOPS}?token=${process.env.REACT_APP_TOKEN}`);
  }, []);

  console.log(response, 'responseeeeee');

  const handleGoBackClick = () => navigate(-1);

  return (
    <div className={styles.container}>
      <div className={styles.btnTitleContainer}>
        <Button onClick={handleGoBackClick} className={styles.btnBack}>
          <img src={arrowBack} alt="arrow back" />
        </Button>
        <h1 className={styles.title}>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h1>
      </div>

      <ul className={styles.recordsContainer}>
        {response?.data.map(record => {
          return (
            <li className={styles.record} key={record.laptop.id}>
              <img
                src={`https://pcfy.redberryinternship.ge/${record.laptop.image}`}
                alt="laptop"
                className={styles.recordImage}
              />
              <div className={styles.recordDescriptionContainer}>
                <p className={styles.employeeLaptopName}>
                  {record.user.name} {record.user.surname}
                </p>

                <p className={styles.employeeLaptopName}>{record.laptop.name}</p>
                <Link to={`${record.laptop.id}`} className={styles.link}>
                  მეტის ნახვა
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Records;
