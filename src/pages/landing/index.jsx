import { useNavigate } from 'react-router-dom';

import styles from './Landing.module.css';
import logo from '../../assets/logo-title.png';
import landingImage from '../../assets/landing-image.png';
import landingImageMobile from '../../assets/landing-image-mobile.png';
import Button from '../../components/UI/button';
import useWidth from '../../hooks/useWidth';

const Landing = () => {
  const mobile = useWidth();
  const navigate = useNavigate();

  const handleAddClick = () => navigate('/employee');
  const handleListClick = () => navigate('/records');

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo"></img>

      {!mobile && <img className={styles.landingImg} src={landingImage} alt="landing"></img>}

      {mobile && <img className={styles.landingImg} src={landingImageMobile} alt="landing"></img>}

      <div className={styles.btnContainer}>
        <Button onClick={handleAddClick} className={styles.btn}>
          ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
        </Button>

        <Button onClick={handleListClick} className={styles.btn}>
          ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ
        </Button>
      </div>
    </div>
  );
};

export default Landing;
