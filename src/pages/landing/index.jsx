import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo-title.png';
import landingImage from '../../assets/landing-image.png';
import Button from '../../components/UI/button';
import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleAddClick = () => navigate('/employee');
  const handleListClick = () => navigate('/records');

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo"></img>

      <img className={styles.landingImg} src={landingImage} alt="landing"></img>

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
