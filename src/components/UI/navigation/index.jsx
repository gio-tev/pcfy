import { useLocation } from 'react-router-dom';

import styles from './Navigation.module.css';
import Button from '../button';
import useWidth from '../../../hooks/useWidth';

const Navigation = ({ onToLaptop, onToEmployee }) => {
  const mobile = useWidth();

  const location = useLocation();

  return (
    <ul className={styles.container}>
      {!mobile && (
        <>
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
        </>
      )}

      {mobile && location.pathname === '/employee' && (
        <li>
          <Button className={styles.btn} onClick={onToEmployee}>
            თანამშრომლის ინფო
          </Button>
          <div className={styles.navigationCounter}>1/2</div>
        </li>
      )}

      {mobile && location.pathname === '/laptop' && (
        <li>
          <Button className={styles.btn} onClick={onToEmployee}>
            ლეპტოპის მახასიათებლები
          </Button>
          <div className={styles.navigationCounter}>2/2</div>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
