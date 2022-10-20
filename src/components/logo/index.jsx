import styles from './Logo.module.css';
import logo from '../../assets/logo.png';

const Logo = () => <img src={logo} alt="logo" className={styles.logo} />;

export default Logo;
