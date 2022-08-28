import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Employee.module.css';
import Navigation from '../../components/UI/navigation';
import Input from '../../components/UI/input';
import Label from '../../components/UI/label';
import logo from '../../assets/logo.png';
import Button from '../../components/UI/button';
import arrowBack from '../../assets/arrow-back.png';
import useFetch from '../../hooks/useFetch';

const teamIds = {
  დეველოპერი: 1,
  HR: 2,
  გაყიდვები: 3,
  დიზაინი: 4,
  მარკეტინგი: 5,
};

const Employee = () => {
  const [userInputs, setUserInputs] = useState({});
  const [hasError, setHasError] = useState(false);
  const [focusedInput, setFocusedInput] = useState({
    name: false,
    surname: false,
    email: false,
    phone_number: false,
  });

  const { name, surname, team, position, email, phone_number } = userInputs;

  const teams = useFetch(process.env.REACT_APP_GET_TEAMS);
  const positions = useFetch(process.env.REACT_APP_GET_POSITIONS);

  const navigate = useNavigate();

  const handleInputs = (inputIdentifier, e) => {
    setUserInputs(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleFocus = inputFocused => {
    setHasError(false);
    setFocusedInput(prevState => {
      return { ...prevState, [inputFocused]: true };
    });
  };

  const handleBlur = inputBlurred => {
    setFocusedInput(prevState => {
      return { ...prevState, [inputBlurred]: false };
    });
  };

  let selectedTeamId;

  for (const member in teamIds) {
    if (member === team) selectedTeamId = teamIds[member];
  }

  const filteredPositions = positions.response?.data.filter(
    position => position.team_id === selectedTeamId
  );

  const handleGoBackClick = () => navigate('/');

  const handleNextClick = () => {
    if (
      !name ||
      name.length < 2 ||
      !/^[ა-ჰ]+$/i.test(name) ||
      !surname ||
      surname.length < 2 ||
      !/^[ა-ჰ]+$/i.test(surname) ||
      !team ||
      !position ||
      !email ||
      !email.trim().endsWith('@redberry.ge') ||
      !phone_number ||
      phone_number.length !== 13 ||
      !phone_number.trim().startsWith('+995')
    ) {
      return setHasError(true);
    }

    navigate('/laptop');
  };

  return (
    <div className={styles.container}>
      <Navigation />

      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        <img src={arrowBack} alt="arrow back" />
      </Button>

      <form className={styles.form}>
        <div className={styles.nameLastnameContainer}>
          <div className={styles.labelInputContainer}>
            <Label>სახელი</Label>
            <Input
              className={styles.nameLastnameInput}
              onChange={handleInputs.bind(this, 'name')}
              onFocus={handleFocus.bind(this, 'name')}
              onBlur={handleBlur.bind(this, 'name')}
            />
            {focusedInput.name && (
              <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}

            {hasError && name && !/^[ა-ჰ]+$/i.test(name) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !name && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && name && name.length < 2 && (
              <p className={`${styles.hint} ${styles.error}`}>მინიმუმ 2 სიმბოლო</p>
            )}
          </div>

          <div className={styles.labelInputContainer}>
            <Label>გვარი</Label>
            <Input
              className={styles.nameLastnameInput}
              onChange={handleInputs.bind(this, 'surname')}
              onFocus={handleFocus.bind(this, 'surname')}
              onBlur={handleBlur.bind(this, 'surname')}
            />
            {focusedInput.surname && (
              <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}

            {hasError && surname && !/^[ა-ჰ]+$/i.test(surname) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !surname && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && surname && surname.length < 2 && (
              <p className={`${styles.hint} ${styles.error}`}>მინიმუმ 2 სიმბოლო</p>
            )}
          </div>
        </div>

        <div className={styles.dropdownsContainer}>
          <div>
            <select onChange={handleInputs.bind(this, 'team')} defaultValue="default">
              <option value="default" disabled hidden>
                თიმი
              </option>

              {teams.response?.data.map(team => {
                return (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>

            {hasError && !team && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}
          </div>

          <div>
            <select
              onChange={handleInputs.bind(this, 'position')}
              defaultValue="default"
              disabled={team ? false : true}
            >
              <option value="default" disabled hidden>
                პოზიცია
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

            {hasError && !position && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}
          </div>
        </div>

        <div className={styles.emailNumberContainer}>
          <div className={styles.labelInputContainer}>
            <Label>მეილი</Label>
            <Input
              className={styles.emailNumberInput}
              onChange={handleInputs.bind(this, 'email')}
              onFocus={handleFocus.bind(this, 'email')}
              onBlur={handleBlur.bind(this, 'email')}
            />

            {focusedInput.email && (
              <p className={styles.hint}>უნდა მთავრდებოდეს @redberry.ge-ით</p>
            )}

            {hasError && email && !email.trim().endsWith('@redberry.ge') && (
              <p className={`${styles.hint} ${styles.error}`}>
                უნდა მთავრდებოდეს @redberry.ge-ით
              </p>
            )}

            {hasError && !email && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}
          </div>

          <div className={styles.labelInputContainer}>
            <Label>ტელეფონის ნომერი</Label>
            <Input
              className={styles.emailNumberInput}
              onChange={handleInputs.bind(this, 'phone_number')}
              onFocus={handleFocus.bind(this, 'phone_number')}
              onBlur={handleBlur.bind(this, 'phone_number')}
            />

            {focusedInput.phone_number && (
              <p className={styles.hint}>
                უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
              </p>
            )}

            {hasError &&
              phone_number &&
              (phone_number.length !== 13 || !phone_number.trim().startsWith('+995')) && (
                <p className={`${styles.hint} ${styles.error}`}>
                  უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
                </p>
              )}

            {hasError && !phone_number && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}
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
