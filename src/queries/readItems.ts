import { gql } from "@apollo/client";

export default gql`
  query readItems($userId: ID!) {
    readItems(userId: $userId) {
      id
      name
      amount
      calories
      fat
      carbs
      protein
    }
  }
`;
