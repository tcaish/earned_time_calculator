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

// Initial transactions state
// params: id: Int, date: String, time_used: Int
export const initialTransactionsState = [
  {
    id: 0,
    date: '1-Jan',
    time_used: 1.25
  }
];

// Initial profile state
export const initialProfileState = {
  id: '0',
  userId: '',
  carry_over_et: 0.0,
  used_et: 0.0,
  current_hol: 0.0,
  hire_date_month: 0,
  hire_date_day: 0,
  hire_date_year: 0,
  total_et_allowed: 0.0,
  total_yearly_paychecks: 0
};

//
// Functions and constants to support calculating the summary
//

// DateType object used in functions below
const DateType = {
  DAY_OF_MONTH: 0,
  MONTH: 1,
  WEEK_OF_YEAR: 2,
  YEAR: 3
};

/**
 * Gets either the current week of the year or the year.
 * @param value type of date value to return
 * @return the specific date type specified by the value param
 */
function getSpecificDateValue(value) {
  const todaysDate = new Date();

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
function getYearlyEarnedTimeValues(hire_month, hire_day, hire_year) {
  let values_arr = [0, 0, 0, 0];
  const starting_et = 17; // measured in days
  const current_month = getSpecificDateValue(DateType.MONTH);
  const current_day = getSpecificDateValue(DateType.DAY_OF_MONTH);
  const current_year = getSpecificDateValue(DateType.YEAR);

  // If you have more than 10 years of service, you earn the same amount of ET/year
  if (current_year - hire_year > 10) {
    values_arr[0] = 27; // et/year; measured in days
    values_arr[1] = 26; // total paychecks/year
    values_arr[2] = 0;
    values_arr[3] = 0;
  } else {
    const total_paychecks_per_month = 2.166666666666667; // 26 paychecks/year divided by 12 months/year
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
  const used_et = transactions.reduce((a, b) => a + (b['time_used'] || 0), 0);

  // Carry over ET into new year; measured in hours
  // To find this, select the Accrual Balance by Trans Date in the leftside
  // window, and then look at the last paycheck of the year to see your ET
  // balance
  const carry_over_et = parseFloat(etInfo.carry_over_et);
  const current_hol = etInfo.current_hol; // holiday time; measured in hours
  const hire_date_month = etInfo.hire_date_month;
  const hire_date_day = etInfo.hire_date_day;
  const hire_date_year = etInfo.hire_date_year;

  const total_et_allowed = etInfo.total_et_allowed;
  const total_yearly_paychecks = etInfo.total_yearly_paychecks;

  const values_arr = getYearlyEarnedTimeValues(
    hire_date_month,
    hire_date_day,
    hire_date_year
  );
  const yearly_et_before = values_arr[0];
  const total_paychecks_before = values_arr[1];
  const yearly_et_after = values_arr[2];
  const total_paychecks_after = values_arr[3];

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
  const et_hol_to_burn = et_to_burn + current_hol;
  const vacation_weeks = Math.round((et_hol_to_burn / 40) * 100.0) / 100.0; // divides ET+HOL by 40 hrs/week
  const vacation_days = Math.round((et_hol_to_burn / 8) * 100.0) / 100.0; // divides ET+HOL by 8 hrs/day

  let current_et_rate = 0.0;

  // If we're before my hire date (5/21)
  if (
    getSpecificDateValue(DateType.MONTH) <= hire_date_month &&
    getSpecificDateValue(DateType.DAY_OF_MONTH) < hire_date_day
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

  // console.log("ET Rate:\t\t\t" + current_et_rate + " hrs/pay period");
  // console.log("Total ET at end of " + getSpecificDateValue(DateType.YEAR) + ":\t" + total_et + " hrs");
  // console.log("ET + HOL to burn:\t\t" + et_hol_to_burn + " hrs");
  // console.log("Total vacation weeks:\t\t" + vacation_weeks + " weeks");
  // console.log("Total vacation days:\t\t" + vacation_days + " days");

  return {
    et_rate: current_et_rate,
    et_end_of_year: total_et,
    et_hol_to_burn: et_hol_to_burn,
    total_vaca_weeks: vacation_weeks,
    total_vaca_days: vacation_days
  };
}
