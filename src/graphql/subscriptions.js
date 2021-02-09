/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEarnedTimeInfo = /* GraphQL */ `
  subscription OnCreateEarnedTimeInfo($owner: String!) {
    onCreateEarnedTimeInfo(owner: $owner) {
      id
      userId
      carry_over_et
      current_hol
      hire_date_month
      hire_date_day
      hire_date_year
      total_et_allowed
      total_yearly_paychecks
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateEarnedTimeInfo = /* GraphQL */ `
  subscription OnUpdateEarnedTimeInfo($owner: String!) {
    onUpdateEarnedTimeInfo(owner: $owner) {
      id
      userId
      carry_over_et
      current_hol
      hire_date_month
      hire_date_day
      hire_date_year
      total_et_allowed
      total_yearly_paychecks
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteEarnedTimeInfo = /* GraphQL */ `
  subscription OnDeleteEarnedTimeInfo($owner: String!) {
    onDeleteEarnedTimeInfo(owner: $owner) {
      id
      userId
      carry_over_et
      current_hol
      hire_date_month
      hire_date_day
      hire_date_year
      total_et_allowed
      total_yearly_paychecks
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction($owner: String!) {
    onCreateTransaction(owner: $owner) {
      id
      date
      type
      debit
      time_used
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($owner: String!) {
    onUpdateTransaction(owner: $owner) {
      id
      date
      type
      debit
      time_used
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction($owner: String!) {
    onDeleteTransaction(owner: $owner) {
      id
      date
      type
      debit
      time_used
      createdAt
      updatedAt
      owner
    }
  }
`;
