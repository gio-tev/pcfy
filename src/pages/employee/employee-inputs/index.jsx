import Input from '../../../components/UI/input';
import Select from '../../../components/UI/select';
import useValidation from '../../../hooks/useValidation';

const EmployeeInputs = ({
  data: {
    styles,
    formHasError,
    handleInputs,
    handleClick,
    handleFocus,
    userInputs,
    filteredPositions,
    teams,
  },
}) => {
  const { nameSurnameHasError, emailHasError, phoneHasError, selectUploadFieldHasError } =
    useValidation();

  const { name, surname, team, position, email, phone_number } = userInputs;

  return (
    <>
      <div className={styles.nameLastnameContainer}>
        <Input
          label="სახელი"
          value={name}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={nameSurnameHasError}
          className={styles.nameLastnameInput}
          identifier="name"
          hintMessage="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        />

        <Input
          label="გვარი"
          value={surname}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={nameSurnameHasError}
          className={styles.nameLastnameInput}
          identifier="surname"
          hintMessage="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        />
      </div>

      <div className={styles.dropdownsContainer}>
        <Select
          value={team}
          formHasError={formHasError}
          validate={selectUploadFieldHasError}
          handleInputs={handleInputs}
          handleClick={handleClick}
          identifier="team"
          defaultValue="თიმი"
          data={teams}
        />

        <Select
          value={position}
          formHasError={formHasError}
          validate={selectUploadFieldHasError}
          handleInputs={handleInputs}
          handleClick={handleClick}
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
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={emailHasError}
          className={styles.emailNumberInput}
          identifier="email"
          hintMessage="უნდა მთავრდებოდეს @redberry.ge-ით"
        />

        <Input
          label="ტელეფონის ნომერი"
          value={phone_number}
          formHasError={formHasError}
          handleInputs={handleInputs}
          handleFocus={handleFocus}
          validate={phoneHasError}
          className={styles.emailNumberInput}
          identifier="phone_number"
          hintMessage="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
          changedHint="ქართული მობ-ნომრის ფორმატი"
        />
      </div>
    </>
  );
};

export default EmployeeInputs;
