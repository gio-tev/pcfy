import styles from './RecordsHeader.module.css';
import useWidth from '../../../hooks/useWidth';
import Button from '../button';
import arrowBack from '../../../assets/arrow-back.png';
import arrowBackMobile from '../../../assets/arrow-back-mobile.png';

const RecordsHeader = ({ handleGoBackClick, title }) => {
  const mobile = useWidth();

  return (
    <div className={styles.btnTitleContainer}>
      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        {mobile && <img src={arrowBackMobile} alt="arrow back" />}
        {!mobile && <img src={arrowBack} alt="arrow back" />}
      </Button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default RecordsHeader;
