import { gql } from "@apollo/client";

export default gql`
  mutation createItem($userId: ID!, $item: CreateItem!) {
    createItem(userId: $userId, item: $item) {
      id
    }
  }
`;
