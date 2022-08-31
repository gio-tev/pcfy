import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Employee.module.css';
import Navigation from '../../components/UI/navigation';
import Input from '../../components/UI/input';
import Label from '../../components/UI/label';
import logo from '../../assets/logo.png';
import Button from '../../components/UI/button';
import arrowBack from '../../assets/arrow-back.png';
import useFetch from '../../hooks/useFetch';
import { AppContext } from '../../store';

const Employee = () => {
  const { dispatch } = useContext(AppContext);

  const teams = useFetch();
  const positions = useFetch();

  const storageData = JSON.parse(window.localStorage.getItem('employeeData'));

  const [userInputs, setUserInputs] = useState(storageData ? storageData : {});
  const [hasError, setHasError] = useState(false);

  const { name, surname, team, position, email, phone_number } = userInputs;

  console.log(userInputs, 'laptop inputssssssss');

  const navigate = useNavigate();

  const currentTeamObj = teams.response?.data.filter(value => value.name === team);
  const team_id = currentTeamObj ? currentTeamObj[0]?.id : undefined;

  const currentPosObj = positions.response?.data.filter(value => value.name === position);
  const position_id = currentPosObj ? currentPosObj[0]?.id : undefined;

  const filteredPositions = positions.response?.data.filter(
    position => position.team_id === team_id
  );

  useEffect(() => {
    teams.sendHttp(process.env.REACT_APP_GET_TEAMS);
    positions.sendHttp(process.env.REACT_APP_GET_POSITIONS);
  }, []);

  useEffect(() => {
    if (filteredPositions && position) {
      setUserInputs(prevState => {
        return { ...prevState, position: filteredPositions[0].name };
      });
    }
  }, [team]);

  const handleInputs = (inputIdentifier, e) => {
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
      console.log('yes');
      return setHasError(true);
    }

    const payloadData = { name, surname, team_id, position_id, phone_number, email };
    const storageData = { name, surname, team, position, phone_number, email };

    dispatch({ type: 'EMPLOYEE_INPUT', payload: payloadData });
    window.localStorage.setItem('employeeData', JSON.stringify(storageData));

    navigate('/laptop');
  };

  const nameSurnameHasError = value =>
    (hasError && value && !/^[ა-ჰ]+$/i.test(value.trim())) ||
    (hasError && !value) ||
    (hasError && value && value.trim().length < 2)
      ? true
      : false;

  const emailHasError = value =>
    (hasError && value && !value.trim().endsWith('@redberry.ge')) || (hasError && !value)
      ? true
      : false;

  const phoneHasError = value =>
    (hasError &&
      value &&
      (value.trim().length !== 13 || !value.trim().startsWith('+995'))) ||
    (hasError && !value)
      ? true
      : false;

  const selectFieldHasError = value => (hasError && !value ? true : false);

  return (
    <div className={styles.container}>
      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        <img src={arrowBack} alt="arrow back" />
      </Button>

      <Navigation />

      <form className={styles.form}>
        <div className={styles.nameLastnameContainer}>
          <div className={styles.labelInputContainer}>
            <Label className={nameSurnameHasError(name) ? styles.error : undefined}>
              სახელი
            </Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(name) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'name')}
              onFocus={handleFocus.bind(this, 'name')}
              value={name}
            />

            <p
              className={`${styles.hint} ${
                nameSurnameHasError(name) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={nameSurnameHasError(surname) ? styles.error : undefined}>
              გვარი
            </Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(surname) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'surname')}
              onFocus={handleFocus.bind(this, 'surname')}
              value={surname}
            />
            <p
              className={`${styles.hint} ${
                nameSurnameHasError(surname) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
          </div>
        </div>

        <div className={styles.dropdownsContainer}>
          <div>
            <select
              className={selectFieldHasError(team) ? styles.inputError : undefined}
              onChange={handleInputs.bind(this, 'team')}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                {team ? team : 'თიმი'}
              </option>

              {teams.response?.data.map(team => {
                return (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <select
              className={selectFieldHasError(position) ? styles.inputError : undefined}
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
            </select>
          </div>
        </div>

        <div className={styles.emailNumberContainer}>
          <div className={styles.labelInputContainer}>
            <Label className={emailHasError(email) ? styles.error : undefined}>
              მეილი
            </Label>
            <Input
              className={`${styles.emailNumberInput} ${
                emailHasError(email) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'email')}
              onFocus={handleFocus.bind(this, 'email')}
              value={email}
            />

            <p
              className={`${styles.hint} ${
                emailHasError(email) ? styles.error : undefined
              }`}
            >
              უნდა მთავრდებოდეს @redberry.ge-ით
            </p>
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={phoneHasError(phone_number) ? styles.error : undefined}>
              ტელეფონის ნომერი
            </Label>
            <Input
              className={`${styles.emailNumberInput} ${
                phoneHasError(phone_number) ? styles.inputError : undefined
              }`}
              onChange={handleInputs.bind(this, 'phone_number')}
              onFocus={handleFocus.bind(this, 'phone_number')}
              value={phone_number}
            />

            <p
              className={`${styles.hint} ${
                phoneHasError(phone_number) ? styles.error : undefined
              }`}
            >
              უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
            </p>
          </div>
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
