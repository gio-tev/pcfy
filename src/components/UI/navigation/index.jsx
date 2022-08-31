import styles from './Navigation.module.css';
import Button from '../button';

const Navigation = ({ onToLaptop, onToEmployee }) => (
  <div className={styles.container}>
    <div>
      <Button className={styles.btn} onClick={onToEmployee}>
        თანამშრომლის ინფო
      </Button>
      {window.location.href.endsWith('employee') && (
        <div className={styles.underline}></div>
      )}
    </div>

    <div>
      <Button className={styles.btn} onClick={onToLaptop}>
        ლეპტოპის მახასიათებლები
      </Button>
      {window.location.href.endsWith('laptop') && (
        <div className={styles.underline}></div>
      )}
    </div>
  </div>
);

export default Navigation;
