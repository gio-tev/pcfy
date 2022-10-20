import React from 'react';

const LaptopInformation = ({ data: { styles, laptop, brand, mobile, laptopPurchaseDate } }) => (
  <>
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
          <span className={styles.value}>{laptop?.response?.data?.laptop?.hard_drive_type}</span>
        </div>
      </div>

      <div className={styles.laptopInnerContainer2}>
        <div className={styles.descriptionContainer}>
          <span className={styles.description}>CPU:</span>
          <span className={styles.description}>CPU-ს ბირთვი:</span>
          <span className={styles.description}>CPU-ს ნაკადი:</span>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.value}>{laptop?.response?.data?.laptop?.cpu?.name}</span>
          <span className={styles.value}>{laptop?.response?.data?.laptop?.cpu?.cores}</span>
          <span className={styles.value}>{laptop?.response?.data?.laptop?.cpu?.threads}</span>
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
          <span className={styles.value}>{laptop?.response?.data?.laptop?.price} ₾</span>
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
  </>
);

export default LaptopInformation;
