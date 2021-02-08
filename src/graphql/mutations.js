/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEarnedTimeInfo = /* GraphQL */ `
  mutation CreateEarnedTimeInfo(
    $input: CreateEarnedTimeInfoInput!
    $condition: ModelEarnedTimeInfoConditionInput
  ) {
    createEarnedTimeInfo(input: $input, condition: $condition) {
      id
      userId
      carry_over_et
      used_et
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
export const updateEarnedTimeInfo = /* GraphQL */ `
  mutation UpdateEarnedTimeInfo(
    $input: UpdateEarnedTimeInfoInput!
    $condition: ModelEarnedTimeInfoConditionInput
  ) {
    updateEarnedTimeInfo(input: $input, condition: $condition) {
      id
      userId
      carry_over_et
      used_et
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
export const deleteEarnedTimeInfo = /* GraphQL */ `
  mutation DeleteEarnedTimeInfo(
    $input: DeleteEarnedTimeInfoInput!
    $condition: ModelEarnedTimeInfoConditionInput
  ) {
    deleteEarnedTimeInfo(input: $input, condition: $condition) {
      id
      userId
      carry_over_et
      used_et
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
