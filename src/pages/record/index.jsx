import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Record.module.css';
import Button from '../../components/UI/button';
import useFetch from '../../hooks/useFetch';
import arrowBack from '../../assets/arrow-back.png';
import arrowBackMobile from '../../assets/arrow-back-mobile.png';
import useWidth from '../../hooks/useWidth';

const Record = () => {
  const mobile = useWidth();

  const laptop = useFetch();
  const teams = useFetch();
  const positions = useFetch();
  const brands = useFetch();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    laptop.sendHttp(
      `${process.env.REACT_APP_GET_REGISTERED_LAPTOP}${id}?token=${process.env.REACT_APP_TOKEN}`
    );
    teams.sendHttp(process.env.REACT_APP_GET_TEAMS);
    positions.sendHttp(process.env.REACT_APP_GET_POSITIONS);
    brands.sendHttp(process.env.REACT_APP_GET_BRANDS);
  }, [id]);

  const handleGoBackClick = () => navigate(-1);

  const image = laptop?.response?.data?.laptop?.image;

  const laptopPurchaseDate =
    laptop?.response?.data?.laptop?.purchase_date &&
    laptop?.response?.data?.laptop?.purchase_date.split('-').join(' / ');

  const team = teams?.response?.data.filter(
    team => team.id === laptop?.response?.data?.user?.team_id
  )[0]?.name;

  const position = positions?.response?.data.filter(
    position => position.id === laptop?.response?.data?.user?.position_id
  )[0]?.name;

  const brand = brands?.response?.data.filter(
    brand => brand.id === laptop?.response?.data?.laptop?.brand_id
  )[0]?.name;

  return (
    <div className={styles.container}>
      <div className={styles.btnTitleContainer}>
        <Button onClick={handleGoBackClick} className={styles.btnBack}>
          {mobile && <img src={arrowBackMobile} alt="arrow back" />}
          {!mobile && <img src={arrowBack} alt="arrow back" />}
        </Button>
        <h1 className={styles.title}>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h1>
      </div>

      <div className={styles.recordContainer}>
        <div className={styles.employeeInformationContainer}>
          {image && (
            <img
              src={`https://pcfy.redberryinternship.ge${image}`}
              alt="laptop"
              className={styles.img}
            />
          )}

          <div className={styles.employeeInformation}>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>სახელი:</span>
              <span className={styles.description}>თიმი:</span>
              <span className={styles.description}>პოზიცია:</span>
              <span className={styles.description}>მეილი:</span>
              <span className={styles.description}>ტელ. ნომერი:</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.value}>
                {laptop?.response?.data?.user?.name}{' '}
                {laptop?.response?.data?.user?.surname}
              </span>
              <span className={styles.value}>{team}</span>
              <span className={styles.value}>{position}</span>
              <span className={styles.value}>{laptop?.response?.data?.user?.email}</span>
              <span className={styles.value}>
                {laptop?.response?.data?.user?.phone_number}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.laptopInformationContainer}>
          <div className={styles.laptopInnerContainer1}>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>ლეპტოპის სახელი:</span>
              <span className={styles.description}>ლეპტოპის ბრენდი:</span>
              <span className={styles.description}>RAM:</span>
              <span className={styles.description}>მეხსიერების ტიპი:</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.value}>{laptop?.response?.data?.laptop?.name}</span>
              <span className={styles.value}>{brand}</span>
              <span className={styles.value}>{laptop?.response?.data?.laptop?.ram}</span>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.hard_drive_type}
              </span>
            </div>
          </div>

          <div className={styles.laptopInnerContainer2}>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>CPU:</span>
              <span className={styles.description}>CPU-ს ბირთვი:</span>
              <span className={styles.description}>CPU-ს ნაკადი:</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.cpu?.name}
              </span>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.cpu?.cores}
              </span>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.cpu?.threads}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.laptopInformationContainer}>
          <div className={styles.laptopInnerContainer3}>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>
                {!mobile ? 'ლეპტოპის მდგომარეობა:' : 'მდგომარეობა:'}
              </span>
              <span className={styles.description}>ლეპტოპის ფასი:</span>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.state === 'new' ? 'ახალი' : 'მეორადი'}
              </span>
              <span className={styles.value}>
                {laptop?.response?.data?.laptop?.price} ₾
              </span>
            </div>
          </div>

          {laptop?.response?.data?.laptop?.purchase_date && (
            <div className={styles.laptopInnerContainer4}>
              <div className={styles.descriptionContainer}>
                <span className={styles.description}>შეძენის რიცხვი:</span>
              </div>
              <div className={styles.descriptionContainer}>
                <span className={styles.value}>{laptopPurchaseDate}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Record;
