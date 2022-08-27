import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = () => {
  const [employeeActive, setEmployeeActive] = useState(false);
  const [laptopActive, setLaptopActive] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <NavLink
          to={'/employee'}
          className={({ isActive }) => {
            if (isActive) {
              setEmployeeActive(true);
              setLaptopActive(false);
            }
            return styles.linkText;
          }}
        >
          თანამშრომლის ინფო
        </NavLink>

        {employeeActive && <div className={styles.underline}></div>}
      </div>

      <div>
        <NavLink
          to={'/laptop'}
          className={({ isActive }) => {
            if (isActive) {
              setLaptopActive(true);
              setEmployeeActive(false);
            }
            return styles.linkText;
          }}
        >
          ლეპტოპის მახასიათებლები
        </NavLink>

        {laptopActive && <div className={styles.underline}></div>}
      </div>
    </div>
  );
};

export default Navigation;
