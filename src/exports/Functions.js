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
