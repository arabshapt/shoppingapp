import { gql } from "@apollo/client";

export default gql`
  mutation updateItem($userId: ID!, $id: ID!, $item: UpdateItem!) {
    updateItem(userId: $userId, id: $id, item: $item) {
      id
    }
  }
`;
