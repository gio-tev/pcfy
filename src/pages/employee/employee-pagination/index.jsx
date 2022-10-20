import Button from '../../../components/UI/button';

const EmployeePagination = ({ data: { styles, handleNextClick } }) => (
  <Button onClick={handleNextClick} className={styles.btnNext}>
    შემდეგი
  </Button>
);

export default EmployeePagination;
