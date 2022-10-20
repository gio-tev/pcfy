import React from 'react';

const EmployeeInformation = ({ data: { styles, image, laptop, team, position, number } }) => (
  <div className={styles.employeeInformationContainer}>
    {image && (
      <img src={`https://pcfy.redberryinternship.ge${image}`} alt="laptop" className={styles.img} />
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
          {laptop?.response?.data?.user?.name} {laptop?.response?.data?.user?.surname}
        </span>
        <span className={styles.value}>{team}</span>
        <span className={styles.value}>{position}</span>
        <span className={styles.value}>{laptop?.response?.data?.user?.email}</span>
        <span className={styles.value}>{number}</span>
      </div>
    </div>
  </div>
);

export default EmployeeInformation;
