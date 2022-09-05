const useValidation = () => {
  const nameSurnameHasError = (value, hasError) => {
    return (hasError && value && !/^[ა-ჰ]+$/i.test(value.trim())) ||
      (hasError && !value) ||
      (hasError && value && value.trim().length < 2)
      ? true
      : false;
  };

  const emailHasError = (value, hasError) => {
    return (hasError && !value.trim().toLowerCase().endsWith('@redberry.ge')) ||
      (hasError && value.trim().replaceAll(' ', '').length < 13)
      ? true
      : false;
  };

  const phoneHasError = (value, hasError) => {
    return hasError &&
      (value.trim().replaceAll(' ', '').length !== 13 || !value.trim().startsWith('+995'))
      ? true
      : false;
  };

  const selectUploadFieldHasError = (value, hasError) =>
    hasError && !value ? true : false;

  const laptopNameHasError = (value, hasError) =>
    hasError && (!value || !/^[\w!@#$%^&*()+= ]*$/.test(value.trim())) ? true : false;

  const numberInputHasError = (value, hasError) =>
    hasError && (!value || +value < 1 || !isFinite(value)) ? true : false;

  const isValidFormat = value => {
    if (
      /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(
        value
      )
    ) {
      return true;
    }
  };

  const isDateInPast = value => {
    const dateString = value,
      dateArgs = dateString.match(/\d{2,4}/g),
      year = dateArgs[2],
      month = parseInt(dateArgs[1]) - 1,
      day = dateArgs[0];

    const milliseconds = new Date(year, month, day).getTime();

    return Date.now() > milliseconds;
  };

  return {
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
