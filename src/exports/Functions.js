// DateType object used in functions below
export const DateType = {
  DAY_OF_MONTH: 0,
  MONTH: 1,
  WEEK_OF_YEAR: 2,
  YEAR: 3
};

// Modal type struct for navigation buttons
export const modalType = {
  profile: 0,
  settings: 1,
  logout: 2,
  transaction: 3
};

// Initial summary state
export const initialSummaryState = {
  et_rate: 0.0,
  et_end_of_year: 0.0,
  et_hol_to_burn: 0.0,
  total_vaca_weeks: 0.0,
  total_vaca_days: 0.0
};

// Initial profile state
export const initialProfileState = {
  //id: '0',
  userId: '',
  carry_over_et: 0.0,
  hire_date: new Date(),
  total_et_allowed: 0.0,
  total_yearly_paychecks: 26
};

// Initial transaction state
export const initialTransactionState = {
  date: new Date(),
  type: 'Vacation',
  debit: 'true',
  time_used: 0.0
};

// The summary card bodies
export const SummaryCardBody = {
  vaca_rate: 'Vacation Rate',
  vaca_end_year: 'Vacation at End of Year',
  vaca_to_burn: 'Vacation/Holiday to Burn',
  vaca_weeks: 'Total Vacation Weeks',
  vaca_days: 'Total Vacation Days'
};

export const SummaryCardTooltips = {
  vaca_rate: 'How many hours per pay period you earn in vacation time.',
  vaca_end_year: "How much vacation time you'll have at the end of the year.",
  vaca_to_burn:
    'How much vacation/holiday time you will need to use to get' +
    ' down to the max amount of carry over you can bring into the new year.',
  vaca_weeks:
    'How many weeks of vacation you have based on the total' +
    ' vacation time to burn.',
  vaca_days:
    'How many days of vacation you have based on the total' +
    ' vacation time to burn.'
};

// Returns the current time
export function getTime() {
  const dateFormat = require('dateformat');
  return dateFormat(new Date(), 'h:MM TT');
}

// Returns the correct format for a date to be put into the
// transactions table
export function getTransactionFormatDate(date) {
  const dateFormat = require('dateformat');
  let dateToFormat = new Date();

  if (date !== undefined) {
    dateToFormat = new Date(date);
  }

  return dateFormat(dateToFormat, 'd-mmm');
}

// Validate that a string is a correct date that looks like this: MM/DD/YYYY
export function isValidDateFromStr(str) {
  const dateFormat = require('dateformat');
  const dateToFormat = new Date(str);
  const formattedDate = dateFormat(dateToFormat, 'mm/dd/yyyy');

  const parms = formattedDate.split(/[\.\-\/]/);
  const mm = parseInt(parms[0], 10);
  const dd = parseInt(parms[1], 10);
  const yyyy = parseInt(parms[2], 10);
  const date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);

  return (
    mm === date.getMonth() + 1 &&
    mm >= 1 &&
    mm <= 12 &&
    dd === date.getDate() &&
    dd >= 1 &&
    dd <= 31 &&
    yyyy === date.getFullYear() &&
    yyyy !== 0 &&
    yyyy.toString().length === 4
  );
}

//
// Functions and constants to support calculating the summary
//
const starting_et = 17;
const max_et = 27;
const paychecks_per_year = 26;

/**
 * Gets either the current week of the year or the year.
 * @param value type of date value to return
 * @return the specific date type specified by the value param
 */
function getSpecificDateValue(value, date) {
  let todaysDate = new Date();

  if (date !== null) {
    todaysDate = date;
  }

  const weekOfYear = date => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  };

  switch (value) {
    case DateType.DAY_OF_MONTH:
      return todaysDate.getDate();
    case DateType.MONTH:
      return todaysDate.getMonth() + 1;
    case DateType.WEEK_OF_YEAR:
      return weekOfYear(todaysDate);
    case DateType.YEAR:
      return todaysDate.getFullYear();
    default:
      return todaysDate.getFullYear();
  }
}

/**
 * Gets the earned time being earned up until the hire date and the updated
 * earned time after the hire date. This is needed because on the day of
 * one's hire date, earned time is increased by one day.
 * @param hire_month the month of date of hire
 * @param hire_day the day of date of hire
 * @param hire_year the year of date of hire
 * @return an array containing the total et earned before the hire date (index 0),
 * the total paychecks before hire date (index 1), the total et earned after
 * hire date (index 2), and the total paychecks after hire date (index 3).
 */
function getYearlyEarnedTimeValues(
  total_yearly_paychecks,
  hire_month,
  hire_day,
  hire_year
) {
  let values_arr = [0, 0, 0, 0];
  const current_month = getSpecificDateValue(DateType.MONTH, null);
  const current_day = getSpecificDateValue(DateType.DAY_OF_MONTH, null);
  const current_year = getSpecificDateValue(DateType.YEAR, null);

  // If you have more than 10 years of service, you earn the same amount of ET/year
  if (current_year - hire_year > 10) {
    values_arr[0] = max_et; // et/year; measured in days
    values_arr[1] = total_yearly_paychecks; // total paychecks/year
    values_arr[2] = 0;
    values_arr[3] = 0;
  } else {
    const total_paychecks_per_month = Math.floor(paychecks_per_year / 12); // 26 paychecks/year divided by 12 months/year
    const service_years = current_year - hire_year;
    let before_et = 0;
    let after_et = 0;

    // Calculate the total et/year before and after hire date

    // If you are on or passed your hire date
    if (
      current_year > hire_year &&
      current_month >= hire_month &&
      current_day >= hire_day
    ) {
      before_et = starting_et + service_years - 1;
      after_et = starting_et + service_years;
    } else {
      if (service_years <= 0) {
        before_et = starting_et;
      } else {
        before_et = starting_et + (service_years - 1);
      }

      after_et = before_et + 1;
    }

    values_arr[0] = before_et;
    values_arr[2] = after_et;

    // Calculate total paychecks for before and after hire date

    values_arr[1] = hire_month * total_paychecks_per_month;
    values_arr[3] = (12 - hire_month) * total_paychecks_per_month;
  }

  return values_arr;
}

/**
 * Calculates all the earned time information for the user.
 * @param etInfo the earned time information object
 * @param transactions a list of transaction objects
 * @return an object containing all the summary data
 */
export function getSummaryValues(etInfo, transactions) {
  // Calculate the amount of used_et so far based on transactions
  let used_et = 0;

  // Make sure there are transactions present
  if (transactions !== undefined) {
    const debit_et = transactions
      .filter(({ debit }) => debit === true)
      .reduce((a, b) => a + (b['time_used'] || 0), 0);

    const credit_et = transactions
      .filter(({ debit }) => debit === false)
      .reduce((a, b) => a + (b['time_used'] || 0), 0);

    used_et = debit_et - credit_et;
  }

  // Get the hire date values based on hire_date
  const hire_date = new Date(etInfo.hire_date);
  const hire_date_month = parseFloat(
    getSpecificDateValue(DateType.MONTH, hire_date)
  );
  const hire_date_day = parseFloat(
    getSpecificDateValue(DateType.DAY_OF_MONTH, hire_date)
  );
  const hire_date_year = parseFloat(
    getSpecificDateValue(DateType.YEAR, hire_date)
  );

  const carry_over_et = parseFloat(etInfo.carry_over_et);
  const total_et_allowed = parseFloat(etInfo.total_et_allowed);
  const total_yearly_paychecks = parseFloat(etInfo.total_yearly_paychecks);

  const values_arr = getYearlyEarnedTimeValues(
    total_yearly_paychecks,
    hire_date_month,
    hire_date_day,
    hire_date_year
  );
  const yearly_et_before = values_arr[0];
  const total_paychecks_before = Math.floor(values_arr[1]);
  const yearly_et_after = values_arr[2];
  const total_paychecks_after = Math.floor(values_arr[3]);

  // console.log('ET before: ' + values_arr[0]);
  // console.log('Total paychecks before: ' + Math.floor(values_arr[1]));
  // console.log('ET after: ' + values_arr[2]);
  // console.log('Total paychecks after: ' + Math.floor(values_arr[3]));

  const total_et_before_hire =
    ((yearly_et_before * 8) / total_yearly_paychecks) * total_paychecks_before;
  const total_et_after_hire =
    ((yearly_et_after * 8) / total_yearly_paychecks) * total_paychecks_after;
  const total_et_for_year =
    Math.round((total_et_before_hire + total_et_after_hire) * 100.0) / 100.0;
  const total_et =
    Math.round((carry_over_et + total_et_for_year) * 100.0) / 100.0;
  const et_to_burn =
    Math.round((total_et - total_et_allowed - used_et) * 100.0) / 100.0;
  let vacation_weeks = Math.round((et_to_burn / 40) * 100.0) / 100.0; // divides ET+HOL by 40 hrs/week
  let vacation_days = Math.round((et_to_burn / 8) * 100.0) / 100.0; // divides ET+HOL by 8 hrs/day

  // If vacation_weeks or vacation_days are below 0, return 0
  if (vacation_weeks < 0) vacation_weeks = 0;
  if (vacation_days < 0) vacation_days = 0;

  let current_et_rate = 0.0;

  // If we're before my hire date (5/21)
  if (values_arr[0] !== max_et) {
    if (
      getSpecificDateValue(DateType.MONTH, null) <= hire_date_month &&
      getSpecificDateValue(DateType.DAY_OF_MONTH, null) < hire_date_day
    ) {
      current_et_rate =
        Math.round(((yearly_et_before * 8) / total_yearly_paychecks) * 100.0) /
        100.0;
    }
    // Else we're on or after my hire date (5/21)
    else {
      current_et_rate =
        Math.round(((yearly_et_after * 8) / total_yearly_paychecks) * 100.0) /
        100.0;
    }
  } else {
    current_et_rate =
      Math.round(((yearly_et_before * 8) / total_yearly_paychecks) * 100.0) /
      100.0;
  }

  // console.log("ET Rate:\t\t\t" + current_et_rate + " hrs/pay period");
  // console.log("Total ET at end of " + getSpecificDateValue(DateType.YEAR) + ":\t" + total_et + " hrs");
  // console.log("ET + HOL to burn:\t\t" + et_hol_to_burn + " hrs");
  // console.log("Total vacation weeks:\t\t" + vacation_weeks + " weeks");
  // console.log("Total vacation days:\t\t" + vacation_days + " days");

  return {
    et_rate: current_et_rate,
    et_end_of_year: total_et,
    et_hol_to_burn: et_to_burn,
    total_vaca_weeks: vacation_weeks,
    total_vaca_days: vacation_days
  };
}
