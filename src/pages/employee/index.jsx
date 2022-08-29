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
  const teams = useFetch(process.env.REACT_APP_GET_TEAMS);
  const positions = useFetch(process.env.REACT_APP_GET_POSITIONS);

  const [userInputs, setUserInputs] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocued] = useState({});

  const { name, surname, team, position, email, phone_number } = userInputs;

  const navigate = useNavigate();

  let selectedTeamId;

  for (const member in teamIds) {
    if (member === team) selectedTeamId = teamIds[member];
  }

  const filteredPositions = positions.response?.data.filter(
    position => position.team_id === selectedTeamId
  );

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

    setIsFocued(prevState => {
      return { ...prevState, [inputFocused]: true };
    });
  };

  const handleBlur = inputBlurred => {
    setIsFocued(prevState => {
      return { ...prevState, [inputBlurred]: false };
    });
  };

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

    // Save to the localSorage

    // Dispatch to the global state

    navigate('/laptop');
  };

  const nameSurnameHasError = value => {
    return (hasError && value && !/^[ა-ჰ]+$/i.test(value)) ||
      (hasError && !value) ||
      (hasError && value && value.length < 2)
      ? true
      : false;
  };

  const emailHasError = value => {
    return (hasError && value && !value.trim().endsWith('@redberry.ge')) ||
      (hasError && !value)
      ? true
      : false;
  };

  const phoneHasError = value => {
    return (hasError &&
      value &&
      (value.length !== 13 || !value.trim().startsWith('+995'))) ||
      (hasError && !value)
      ? true
      : false;
  };

  return (
    <div className={styles.container}>
      <Button onClick={handleGoBackClick} className={styles.btnBack}>
        <img src={arrowBack} alt="arrow back" />
      </Button>

      <Navigation />

      <form className={styles.form}>
        <div className={styles.nameLastnameContainer}>
          <div className={styles.labelInputContainer}>
            <Label className={nameSurnameHasError(name) && styles.error}>სახელი</Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(name) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'name')}
              onFocus={handleFocus.bind(this, 'name')}
              onBlur={handleBlur.bind(this, 'name')}
            />
            {isFocused.name && (
              <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}

            {hasError && name && !/^[ა-ჰ]+$/i.test(name.trim()) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !name && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && name && name.trim().length < 2 && (
              <p className={`${styles.hint} ${styles.error}`}>მინიმუმ 2 სიმბოლო</p>
            )}
          </div>

          <div className={styles.labelInputContainer}>
            <Label className={nameSurnameHasError(surname) && styles.error}>გვარი</Label>
            <Input
              className={`${styles.nameLastnameInput} ${
                nameSurnameHasError(surname) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'surname')}
              onFocus={handleFocus.bind(this, 'surname')}
              onBlur={handleBlur.bind(this, 'surname')}
            />
            {isFocused.surname && (
              <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}

            {hasError && surname && !/^[ა-ჰ]+$/i.test(surname.trim()) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !surname && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && surname && surname.trim().length < 2 && (
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
            <Label className={emailHasError(email) && styles.error}>მეილი</Label>
            <Input
              className={`${styles.emailNumberInput} ${
                emailHasError(email) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'email')}
              onFocus={handleFocus.bind(this, 'email')}
              onBlur={handleBlur.bind(this, 'email')}
            />

            {isFocused.email && (
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
            <Label className={phoneHasError(phone_number) && styles.error}>
              ტელეფონის ნომერი
            </Label>
            <Input
              className={`${styles.emailNumberInput} ${
                phoneHasError(phone_number) && styles.inputError
              }`}
              onChange={handleInputs.bind(this, 'phone_number')}
              onFocus={handleFocus.bind(this, 'phone_number')}
              onBlur={handleBlur.bind(this, 'phone_number')}
            />

            {isFocused.phone_number && (
              <p className={styles.hint}>
                უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
              </p>
            )}

            {hasError &&
              phone_number &&
              (phone_number.trim().length !== 13 ||
                !phone_number.trim().startsWith('+995')) && (
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
