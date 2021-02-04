// Modal type struct for navigation buttons
export const modalType = {
  profile: 0,
  settings: 1,
  logout: 2,
  transaction: 3
};

// Initial summary state
export const initialSummaryState = {
  et_rate: 0.1,
  et_end_of_year: 0.2,
  et_hol_to_burn: 0.3,
  total_vaca_weeks: 0.4,
  total_vaca_days: 0.5
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
