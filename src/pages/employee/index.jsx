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
  }, []);

  useEffect(() => {
    filterPostionsAndSetTeamId();
  }, [team]);

  useEffect(() => {
    setPositionId();
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
      !email ||
      !email.trim().endsWith('@redberry.ge') ||
      !phone_number ||
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

{
  /* <div className={styles.labelInputContainer}>
            <Label
              className={nameSurnameHasError(name, hasError) ? styles.error : undefined}
            >
              სახელი
            </Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(name, hasError) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'name')}
              onFocus={handleFocus.bind(this, 'name')}
              value={name}
            />

            <p
              className={`${styles.hint} ${
                nameSurnameHasError(name, hasError) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
          </div> */
}

{
  /* <div className={styles.labelInputContainer}>
            <Label
              className={
                nameSurnameHasError(surname, hasError) ? styles.error : undefined
              }
            >
              გვარი
            </Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(surname, hasError) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'surname')}
              onFocus={handleFocus.bind(this, 'surname')}
              value={surname}
            />
            <p
              className={`${styles.hint} ${
                nameSurnameHasError(surname, hasError) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
          </div> */
}

{
  /* <select
              className={
                selectUploadFieldHasError(team, hasError) ? styles.inputError : undefined
              }
              onChange={handleInputs.bind(this, 'team')}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                {team ? userInputs.team : 'თიმი'}
              </option>

              {teams.response?.data.map(team => {
                return (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select> */
}

{
  /* <select
              className={
                selectUploadFieldHasError(position, hasError)
                  ? styles.inputError
                  : undefined
              }
              onChange={handleInputs.bind(this, 'position')}
              defaultValue="default"
              disabled={team ? false : true}
            >
              <option value="default" disabled hidden>
                {position ? position : 'პოზიცია'}
              </option>

              {filteredPositions &&
                filteredPositions.map(position => {
                  return (
                    <option key={position.id} value={position.name}>
                      {position.name}
                    </option>
                  );
                })}
            </select> */
}

{
  /* <div className={styles.labelInputContainer}>
            <Label className={emailHasError(email, hasError) ? styles.error : undefined}>
              მეილი
            </Label>
            <Input
              className={`${styles.emailNumberInput} ${
                emailHasError(email, hasError) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'email')}
              onFocus={handleFocus.bind(this, 'email')}
              value={email}
            />

            <p
              className={`${styles.hint} ${
                emailHasError(email, hasError) ? styles.error : undefined
              }`}
            >
              უნდა მთავრდებოდეს @redberry.ge-ით
            </p>
          </div> */
}

{
  /* 
          <div className={styles.labelInputContainer}>
            <Label
              className={phoneHasError(phone_number, hasError) ? styles.error : undefined}
            >
              ტელეფონის ნომერი
            </Label>
            <Input
              className={`${styles.emailNumberInput} ${
                phoneHasError(phone_number, hasError) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'phone_number')}
              onFocus={handleFocus.bind(this, 'phone_number')}
              value={phone_number}
            />

            <p
              className={`${styles.hint} ${
                phoneHasError(phone_number, hasError) ? styles.error : undefined
              }`}
            >
              {mobile && 'ქართული მობ-ნომრის ფორმატი'}
              {!mobile && 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'}
            </p>
          </div> */
}
