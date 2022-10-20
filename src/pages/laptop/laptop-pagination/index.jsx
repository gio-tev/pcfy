import Button from '../../../components/UI/button';

const LaptopPagination = ({ data: { styles, handleGoBackClick, handleNextClick } }) => {
  return (
    <div className={styles.formBtnsContainer}>
      <Button onClick={handleGoBackClick} className={styles.formBtnBack}>
        უკან
      </Button>
      <Button onClick={handleNextClick} className={styles.btnSave}>
        დამახსოვრება
      </Button>
    </div>
  );
};

export default LaptopPagination;
