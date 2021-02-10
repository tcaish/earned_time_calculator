/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEarnedTimeInfo = /* GraphQL */ `
  query GetEarnedTimeInfo($id: ID!) {
    getEarnedTimeInfo(id: $id) {
      id
      userId
      carry_over_et
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
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        type
        debit
        time_used
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
