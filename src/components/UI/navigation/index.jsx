import { useLocation } from 'react-router-dom';

import styles from './Navigation.module.css';
import Button from '../button';

const Navigation = ({ onToLaptop, onToEmployee }) => {
  const location = useLocation();

  return (
    <ul className={styles.container}>
      <li>
        <Button className={styles.btn} onClick={onToEmployee}>
          თანამშრომლის ინფო
        </Button>
        {location.pathname === '/employee' && <div className={styles.underline}></div>}
      </li>

      <li>
        <Button className={styles.btn} onClick={onToLaptop}>
          ლეპტოპის მახასიათებლები
        </Button>
        {location.pathname === '/laptop' && <div className={styles.underline}></div>}
      </li>
    </ul>
  );
};

export default Navigation;
