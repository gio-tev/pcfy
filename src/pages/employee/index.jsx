import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Employee.module.css';
import useValidation from '../../hooks/useValidation';
import useLocalStorage from '../../hooks/useLocalStorage';
import useFetch from '../../hooks/useFetch';
import useSetIdsAndFilterPositions from '../../hooks/useSetIdsAndFilterPositions';
import FormHeader from '../../components/UI/form-header';
import Logo from '../../components/logo';
import EmployeeInputs from './employee-inputs';
import EmployeePagination from './employee-pagination';
import { employeeInitialState } from '../../utils/inputsInitialState';

const Employee = () => {
  const teams = useFetch();
  const positions = useFetch();

  const [userInputs, setUserInputs] = useLocalStorage('employeeData', employeeInitialState);
  const [filteredPositions, setFilteredPositions] = useLocalStorage('filteredPositions', []);

  const { filterPostionsAndSetTeamId, setPositionId } = useSetIdsAndFilterPositions();
  const { employeeFormHasError } = useValidation();

  const [formHasError, setFormHasError] = useState(false);
  const [sameTeam, setSameTeam] = useState(true);

  const navigate = useNavigate();

  const { team, position } = userInputs;

  useEffect(() => {
    teams.sendHttp(process.env.REACT_APP_GET_TEAMS);
    positions.sendHttp(process.env.REACT_APP_GET_POSITIONS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = filterPostionsAndSetTeamId(teams, positions, team);

    if (filtered && position && !sameTeam) {
      setUserInputs(prevState => {
        return { ...prevState, position: filtered[0]?.name };
      });
    }

    filtered && setFilteredPositions(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  useEffect(() => {
    setPositionId(positions, position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const handleInputs = (inputIdentifier, e) => {
    if (inputIdentifier === 'team') {
      setSameTeam(false);
    }

    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleFocus = () => setFormHasError(false);
  const handleClick = () => setFormHasError(false);

  const handleGoBackClick = () => navigate('/');
  const handleNextClick = () =>
    employeeFormHasError(userInputs) ? setFormHasError(true) : navigate('/laptop');

  return (
    <div className={styles.container}>
      <FormHeader
        handleGoBackClick={handleGoBackClick}
        handleNextClick={handleNextClick}
        className={styles.btnBack}
      />

      <form className={styles.form}>
        <EmployeeInputs
          data={{
            styles,
            formHasError,
            handleInputs,
            handleClick,
            handleFocus,
            userInputs,
            filteredPositions,
            teams,
          }}
        />

        <EmployeePagination data={{ styles, handleNextClick }} />
      </form>

      <Logo />
    </div>
  );
};

export default Employee;
