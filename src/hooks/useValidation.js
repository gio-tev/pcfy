const useValidation = () => {
  const nameSurnameHasError = (value, hasError) => {
    return (hasError && value && !/^[ა-ჰ]+$/i.test(value.trim())) ||
      (hasError && !value) ||
      (hasError && value && value.trim().length < 2)
      ? true
      : false;
  };

  const emailHasError = (value, hasError) => {
    return (hasError && value && !value.trim().endsWith('@redberry.ge')) ||
      (hasError && !value)
      ? true
      : false;
  };

  const phoneHasError = (value, hasError) => {
    return (hasError &&
      value &&
      (value.trim().length !== 13 || !value.trim().startsWith('+995'))) ||
      (hasError && !value)
      ? true
      : false;
  };

  const selectUploadFieldHasError = (value, hasError) =>
    hasError && !value ? true : false;

  const laptopNameHasError = (value, hasError) =>
    hasError && (!value || !/^[\w!@#$%^&*()+= ]*$/.test(value.trim())) ? true : false;

  const numberInputHasError = (value, hasError) =>
    hasError && (!value || +value < 1 || !isFinite(value)) ? true : false;

  return {
    nameSurnameHasError,
    emailHasError,
    phoneHasError,
    laptopNameHasError,
    selectUploadFieldHasError,
    numberInputHasError,
  };
};

export default useValidation;
