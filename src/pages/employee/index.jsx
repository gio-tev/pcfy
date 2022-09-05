import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Employee.module.css';
import logo from '../../assets/logo.png';
import Button from '../../components/UI/button';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import useValidation from '../../hooks/useValidation';
import FormHeader from '../../components/UI/form-header';
import Input from '../../components/UI/input';
import Select from '../../components/UI/select';

const Employee = () => {
  const teams = useFetch();
  const positions = useFetch();

  const { nameSurnameHasError, emailHasError, phoneHasError, selectUploadFieldHasError } =
    useValidation();

  const [userInputs, setUserInputs] = useLocalStorage('employeeData', {
    name: '',
    surname: '',
    team: '',
    position: '',
    phone_number: '',
    email: '',
  });
  const [, setTeamPositionIds] = useLocalStorage('teamPositionIds', {});
  const [filteredPositions, setFilteredPositions] = useLocalStorage(
    'filteredPositions',
    []
  );

  const [sameTeam, setSameTeam] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { name, surname, team, position, email, phone_number } = userInputs;

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterPostionsAndSetTeamId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  useEffect(() => {
    setPositionId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const getData = () => {
    teams.sendHttp(process.env.REACT_APP_GET_TEAMS);
    positions.sendHttp(process.env.REACT_APP_GET_POSITIONS);
  };

  const filterPostionsAndSetTeamId = () => {
    if (team) {
      const currentTeamObj = teams.response?.data.filter(value => value.name === team);

      const teamId = currentTeamObj && currentTeamObj[0]?.id;
      const filtered = positions.response?.data.filter(
        position => position.team_id === teamId
      );

      if (filtered && position && sameTeam) {
        setUserInputs(prevState => {
          return { ...prevState, position };
        });
      } else if (filtered && position && !sameTeam) {
        setUserInputs(prevState => {
          return { ...prevState, position: filtered[0]?.name };
        });
      }

      if (filtered) {
        setFilteredPositions(filtered);
      }

      if (teamId) {
        setTeamPositionIds(prevState => {
          return {
            ...prevState,
            team_id: teamId,
          };
        });
      }
    }
  };

  const setPositionId = () => {
    if (position) {
      const currentPosObj = positions.response?.data.filter(
        value => value.name === position
      );
      const positionId = currentPosObj && currentPosObj[0]?.id;

      if (positionId) {
        setTeamPositionIds(prevState => {
          return {
            ...prevState,
            position_id: positionId,
          };
        });
      }
    }
  };

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

  const handleFocus = () => setHasError(false);

  const handleGoBackClick = () => navigate('/');

  const handleNextClick = () => {
    if (
      !name ||
      name.trim().length < 2 ||
      !/^[ა-ჰ]+$/i.test(name.trim()) ||
      !surname ||
      surname.trim().length < 2 ||
      !/^[ა-ჰ]+$/i.test(surname.trim()) ||
      !team ||
      !position ||
      email.trim().length < 13 ||
      !email.trim().toLowerCase().endsWith('@redberry.ge') ||
      phone_number.trim().length !== 13 ||
      !phone_number.trim().startsWith('+995')
    ) {
      return setHasError(true);
    }

    navigate('/laptop');
  };

  return (
    <div className={styles.container}>
      <FormHeader
        handleGoBackClick={handleGoBackClick}
        handleNextClick={handleNextClick}
        className={styles.btnBack}
      />

      <form className={styles.form}>
        <div className={styles.nameLastnameContainer}>
          <Input
            label="სახელი"
            value={name}
            hasError={hasError}
            handleInputs={handleInputs}
            handleFocus={handleFocus}
            validator={nameSurnameHasError}
            className={styles.nameLastnameInput}
            identifier="name"
            hintMessage="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          />

          <Input
            label="გვარი"
            value={surname}
            hasError={hasError}
            handleInputs={handleInputs}
            handleFocus={handleFocus}
            validator={nameSurnameHasError}
            className={styles.nameLastnameInput}
            identifier="surname"
            hintMessage="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          />
        </div>

        <div className={styles.dropdownsContainer}>
          <Select
            value={team}
            hasError={hasError}
            validator={selectUploadFieldHasError}
            handleInputs={handleInputs}
            identifier="team"
            defaultValue="თიმი"
            data={teams}
          />

          <Select
            value={position}
            hasError={hasError}
            validator={selectUploadFieldHasError}
            handleInputs={handleInputs}
            identifier="position"
            defaultValue="პოზიცია"
            data={filteredPositions}
            team={team}
          />
        </div>

        <div className={styles.emailNumberContainer}>
          <Input
            label="მეილი"
            value={email}
            hasError={hasError}
            handleInputs={handleInputs}
            handleFocus={handleFocus}
            validator={emailHasError}
            className={styles.emailNumberInput}
            identifier="email"
            hintMessage="უნდა მთავრდებოდეს @redberry.ge-ით"
          />

          <Input
            label="ტელეფონის ნომერი"
            value={phone_number}
            hasError={hasError}
            handleInputs={handleInputs}
            handleFocus={handleFocus}
            validator={phoneHasError}
            className={styles.emailNumberInput}
            identifier="phone_number"
            hintMessage="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
            changedHint="ქართული მობ-ნომრის ფორმატი"
          />
        </div>

        <Button onClick={handleNextClick} className={styles.btnNext}>
          შემდეგი
        </Button>
      </form>

      <img src={logo} alt="logo" className={styles.logo} />
    </div>
  );
};

export default Employee;
