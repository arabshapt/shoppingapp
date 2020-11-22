import { gql } from "@apollo/client";

export default gql`
  mutation deleteItem($userId: ID!, $id: ID!) {
    deleteItem(userId: $userId, id: $id) {
      id
    }
  }
`;
