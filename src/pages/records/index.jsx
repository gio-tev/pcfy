import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Records.module.css';
import useFetch from '../../hooks/useFetch';
import RecordsHeader from '../../components/UI/records-header';

const Records = () => {
  const { response, sendHttp } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    sendHttp(`${process.env.REACT_APP_GET_LAPTOPS}?token=${process.env.REACT_APP_TOKEN}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBackClick = () => navigate('/');

  return (
    <div className={styles.container}>
      <RecordsHeader handleGoBackClick={handleGoBackClick} title="ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ" />

      <ul className={styles.recordsContainer}>
        {response?.data.map(record => {
          return (
            <li className={styles.record} key={record.laptop.id}>
              <img
                src={`https://pcfy.redberryinternship.ge${record.laptop.image}`}
                alt="laptop"
                className={styles.recordImage}
              />
              <div className={styles.recordDescriptionContainer}>
                <p className={styles.employeeName}>
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
