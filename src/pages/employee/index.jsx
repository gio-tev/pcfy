import { useState, useContext, useEffect, useRef } from 'react';
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

  const teams = useFetch(process.env.REACT_APP_GET_TEAMS);
  const positions = useFetch(process.env.REACT_APP_GET_POSITIONS);

  const [userInputs, setUserInputs] = useState({});
  const [hasError, setHasError] = useState(false);

  // const [isFocused, setIsFocued] = useState({});

  const { name, surname, team, position, email, phone_number } = userInputs;

  const navigate = useNavigate();

  const currentTeamObj = teams.response?.data.filter(value => value.name === team);
  const team_id = currentTeamObj ? currentTeamObj[0]?.id : undefined;

  const currentPosObj = positions.response?.data.filter(value => value.name === position);
  const position_id = currentPosObj ? currentPosObj[0]?.id : undefined;

  const filteredPositions = positions.response?.data.filter(
    position => position.team_id === team_id
  );

  useEffect(() => {
    if (filteredPositions && position) {
      setUserInputs(prevState => {
        return { ...prevState, position: filteredPositions[0].name };
      });
    }
  }, [team]);
  // console.log(filteredPositions, 'xxx');

  const handleInputs = (inputIdentifier, e) => {
    // if (inputIdentifier === 'team') {
    // }

    // console.log(e.target.value);

    setUserInputs(prevState => {
      // console.log(e.target, 'wdwdwwwwwwwwwwwwwwwwwwww');
      return {
        ...prevState,
        [inputIdentifier]: e.target.value,
      };
    });
  };

  const handleFocus = () => {
    setHasError(false);

    // setIsFocued(prevState => {
    //   return { ...prevState, [inputFocused]: true };
    // });
  };

  // const handleBlur = inputBlurred => {
  //   setIsFocued(prevState => {
  //     return { ...prevState, [inputBlurred]: false };
  //   });
  // };

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

    const employeeData = { name, surname, team_id, position_id, phone_number, email };
    // Save to the localSorage

    // Dispatch to the global state
    dispatch({ type: 'EMPLOYEE_INPUT', payload: employeeData });

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
              // onBlur={handleBlur.bind(this, 'name')}
            />

            {/* {hasError && nameSurnameHasError(name) && (
              <p className={`${styles.hint} ${styles.error}`}>
                მინიმუმ 2 სიმბოლო, ქართული ასოები
              </p>
            )} */}

            <p
              className={`${styles.hint} ${
                nameSurnameHasError(name) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>

            {/* ///////////////////////////// */}
            {/* {isFocused.name && (
                  <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
                )} */}

            {/* {hasError && name && !/^[ა-ჰ]+$/i.test(name) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !name && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && name && name.trim().length < 2 && (
              <p className={`${styles.hint} ${styles.error}`}>მინიმუმ 2 სიმბოლო</p>
            )} */}
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
              // onBlur={handleBlur.bind(this, 'surname')}
            />
            <p
              className={`${styles.hint} ${
                nameSurnameHasError(surname) ? styles.error : undefined
              }`}
            >
              მინიმუმ 2 სიმბოლო, ქართული ასოები
            </p>
            {/* {isFocused.surname && (
              <p className={styles.hint}>მინიმუმ 2 სიმბოლო, ქართული ასოები</p>
            )}

            {hasError && surname && !/^[ა-ჰ]+$/i.test(surname) && (
              <p className={`${styles.hint} ${styles.error}`}>გამოიყენე ქართული ასოები</p>
            )}

            {hasError && !surname && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )}

            {hasError && surname && surname.trim().length < 2 && (
              <p className={`${styles.hint} ${styles.error}`}>მინიმუმ 2 სიმბოლო</p>
            )} */}
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

            {/* {hasError && !team && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )} */}
          </div>

          <div>
            <select
              className={selectFieldHasError(position) ? styles.inputError : undefined}
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
            {/* 
            {hasError && !position && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )} */}
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
              // onBlur={handleBlur.bind(this, 'email')}
            />

            <p
              className={`${styles.hint} ${
                emailHasError(email) ? styles.error : undefined
              }`}
            >
              უნდა მთავრდებოდეს @redberry.ge-ით
            </p>
            {/* {isFocused.email && (
              <p className={styles.hint}>უნდა მთავრდებოდეს @redberry.ge-ით</p>
            )}

            {hasError && email && !email.trim().endsWith('@redberry.ge') && (
              <p className={`${styles.hint} ${styles.error}`}>
                უნდა მთავრდებოდეს @redberry.ge-ით
              </p>
            )}

            {hasError && !email && (
              <p className={`${styles.hint} ${styles.error}`}>აუცილებელი ველი</p>
            )} */}
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
              // onBlur={handleBlur.bind(this, 'phone_number')}
            />

            <p
              className={`${styles.hint} ${
                phoneHasError(phone_number) ? styles.error : undefined
              }`}
            >
              უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
            </p>

            {/* {isFocused.phone_number && (
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
            )} */}
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
