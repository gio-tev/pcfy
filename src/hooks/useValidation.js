const useValidation = () => {
  const employeeFormHasError = employeeInputs => {
    const { name, surname, team, position, email, phone_number } = employeeInputs;
    return (
      nameSurnameHasError(name) ||
      nameSurnameHasError(surname) ||
      selectUploadFieldHasError(team) ||
      selectUploadFieldHasError(position) ||
      emailHasError(email) ||
      phoneHasError(phone_number)
    );
  };

  const laptopFormHasError = (laptopInputs, imageDataURL, imageUploaded) => {
    const {
      laptop_name,
      laptop_brand,
      laptop_cpu,
      laptop_cpu_cores,
      laptop_cpu_threads,
      laptop_ram,
      laptop_hard_drive_type,
      laptop_price,
      laptop_state,
    } = laptopInputs;

    return (
      (selectUploadFieldHasError(imageDataURL) && selectUploadFieldHasError(imageUploaded)) ||
      laptopNameHasError(laptop_name) ||
      selectUploadFieldHasError(laptop_brand) ||
      selectUploadFieldHasError(laptop_cpu) ||
      numberInputHasError(laptop_cpu_cores) ||
      numberInputHasError(laptop_cpu_threads) ||
      numberInputHasError(laptop_ram) ||
      selectUploadFieldHasError(laptop_hard_drive_type) ||
      numberInputHasError(laptop_price) ||
      selectUploadFieldHasError(laptop_state)
    );
  };

  const nameSurnameHasError = value =>
    !value || !/^[ა-ჰ]+$/i.test(value.trim()) || value.trim().length < 2;

  const emailHasError = value =>
    !value?.trim().toLowerCase().endsWith('@redberry.ge') ||
    !/\S+@\S+\.\S+/.test(value) ||
    value?.trim().length < 13;

  const phoneHasError = value =>
    value?.trim().includes(' ') ||
    value?.trim().length !== 13 ||
    !value?.trim().startsWith('+995') ||
    !/^[0-9]*$/.test(value?.trim().slice(4));

  const selectUploadFieldHasError = value => !value;

  const laptopNameHasError = value =>
    value?.trim().length === 0 || !/^[\w!@#$%^&*()+= ]*$/.test(value?.trim());

  const numberInputHasError = value => !value || +value < 1 || !isFinite(value);

  const isValidFormat = value =>
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
      value
    );

  const isDateInPast = value => {
    const dateArr = value.split('/').reverse();
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];

    const milliseconds = new Date(year, month, day).getTime();

    return Date.now() > milliseconds;
  };

  return {
    employeeFormHasError,
    laptopFormHasError,
    nameSurnameHasError,
    emailHasError,
    phoneHasError,
    laptopNameHasError,
    selectUploadFieldHasError,
    numberInputHasError,
    isValidFormat,
    isDateInPast,
  };
};

export default useValidation;
