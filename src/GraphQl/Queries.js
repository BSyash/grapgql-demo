import { gql } from "@apollo/client";
export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
      name
    }
  }
`;
export const SEARCH_RATES = gql`
  query GetRates ($currency :String!){
    rates(currency: $currency) {
      currency
      rate
      name
    }
  }
`;
