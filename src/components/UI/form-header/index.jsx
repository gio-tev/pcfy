import Button from '../button';
import Navigation from '../navigation';
import arrowBackMobile from '../../../assets/arrow-back-mobile.png';
import arrowBack from '../../../assets/arrow-back.png';
import useWidth from '../../../hooks/useWidth';

const FormHeader = ({ handleGoBackClick, handleNextClick, className }) => {
  const mobile = useWidth();

  return (
    <>
      <Button onClick={handleGoBackClick} className={className}>
        {mobile && <img src={arrowBackMobile} alt="arrow back" />}
        {!mobile && <img src={arrowBack} alt="arrow back" />}
      </Button>

      <Navigation onToEmployee={handleGoBackClick} onToLaptop={handleNextClick} />
    </>
  );
};

export default FormHeader;
