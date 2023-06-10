const validateEmail = function (email: string) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateDate = function (date: string | null) {
  if (date) {
    // ISO string regex without milliseconds
    const dateRegex = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])Z$/;
    return dateRegex.test(date);
  }
  return true;
};

const formattedNow = function () {
  return new Date().toISOString().split('.')[0] + 'Z';
};

export { validateDate, validateEmail, formattedNow };
