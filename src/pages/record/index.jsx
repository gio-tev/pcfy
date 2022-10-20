import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Record.module.css';
import useFetch from '../../hooks/useFetch';
import useWidth from '../../hooks/useWidth';
import RecordsHeader from '../../components/UI/records-header';
import EmployeeInformation from './employee-information';
import LaptopInformation from './laptop-information';

const Record = () => {
  const mobile = useWidth();
  const navigate = useNavigate();
  const { id } = useParams();

  const laptop = useFetch();
  const teams = useFetch();
  const positions = useFetch();
  const brands = useFetch();

  useEffect(() => {
    laptop.sendHttp(
      `${process.env.REACT_APP_GET_REGISTERED_LAPTOP}${id}?token=${process.env.REACT_APP_TOKEN}`
    );
    teams.sendHttp(process.env.REACT_APP_GET_TEAMS);
    positions.sendHttp(process.env.REACT_APP_GET_POSITIONS);
    brands.sendHttp(process.env.REACT_APP_GET_BRANDS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const image = laptop?.response?.data?.laptop?.image;

  const laptopPurchaseDate =
    laptop?.response?.data?.laptop?.purchase_date &&
    laptop?.response?.data?.laptop?.purchase_date.split('-').join(' / ');

  let number = laptop?.response?.data?.user?.phone_number;
  number = `
  ${number?.slice(0, 4)}
  ${number?.slice(4, 7)}
  ${number?.slice(7, 9)} 
  ${number?.slice(9, 11)} 
  ${number?.slice(11)}
  `;

  const team = teams?.response?.data.find(
    team => team.id === laptop?.response?.data?.user?.team_id
  )?.name;

  const position = positions?.response?.data.find(
    position => position.id === laptop?.response?.data?.user?.position_id
  )?.name;

  const brand = brands?.response?.data.find(
    brand => brand.id === laptop?.response?.data?.laptop?.brand_id
  )?.name;

  const handleGoBackClick = () => navigate(-1);

  return (
    <div className={styles.container}>
      <RecordsHeader handleGoBackClick={handleGoBackClick} title="ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ" />

      {laptop.isLoading && <p className={styles.loading}>Loading...</p>}

      {!laptop.isLoading && (
        <div className={styles.recordContainer}>
          <EmployeeInformation data={{ styles, image, laptop, team, position, number }} />

          <LaptopInformation data={{ styles, laptop, brand, mobile, laptopPurchaseDate }} />
        </div>
      )}
    </div>
  );
};

export default Record;
