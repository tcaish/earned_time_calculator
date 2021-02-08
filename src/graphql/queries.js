/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEarnedTimeInfo = /* GraphQL */ `
  query GetEarnedTimeInfo($id: ID!) {
    getEarnedTimeInfo(id: $id) {
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
export const listEarnedTimeInfos = /* GraphQL */ `
  query ListEarnedTimeInfos(
    $filter: ModelEarnedTimeInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEarnedTimeInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
