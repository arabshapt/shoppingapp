import React, { useContext } from "react";

import {
  TableCell,
  TableRow,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { formatString } from "../../helpers/format";
import styled from "styled-components";
import {
  DeleteItemMutation,
  Exact,
  Item,
  ReadItemsDocument,
  ReadItemsQuery,
} from "../../generated/graphql";
import { ItemType } from "./index";
import { UserContext } from "../../userProvider";
import { MutationTuple } from "@apollo/client";

const IconButtonStyled = styled(IconButton)`
  padding: 0px !important;
`;

interface ItemRowProps {
  isApolloLoading: boolean;
  item: Item;
  data: ReadItemsQuery | undefined;
  deleteMutation: MutationTuple<
    DeleteItemMutation,
    Exact<{
      userId: string;
      id: string;
    }>
  >;
  setMutationState: (value: "create" | "update") => void;
  setWishItem: (value: ItemType) => void;
  setModalVisible: (value: boolean) => void;
}

const ItemRow = ({
  isApolloLoading,
  item,
  data,
  deleteMutation,
  setMutationState,
  setWishItem,
  setModalVisible,
}: ItemRowProps) => {
  const user: any = useContext(UserContext);
  const [deleteItem] = deleteMutation;
  const items = data?.readItems ?? [];

  const handleDelete = (id: string) => {
    deleteItem({
      variables: { userId: user?.displayName, id },
      refetchQueries: [
        { query: ReadItemsDocument, variables: { userId: user?.displayName } },
      ],
    });
  };
  const handleEdit = (id: string) => {
    setMutationState("update");
    const selectedItem = items.find((item: Item | null) => item?.id === id);
    if (selectedItem) {
      const item = (({ __typename, ...item }: Item): ItemType => item)(
        selectedItem
      );
      setWishItem({ ...item });
      setModalVisible(true);
    }
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">{item.amount}</TableCell>
      <TableCell align="right">{formatString(item.calories)}</TableCell>
      <TableCell align="right">{formatString(item.fat)}</TableCell>
      <TableCell align="right">{formatString(item.carbs)}</TableCell>
      <TableCell align="right">{formatString(item.protein)}</TableCell>
      <TableCell align="right">
        <IconButtonStyled onClick={() => handleEdit(item.id)} color="primary">
          {isApolloLoading ? <CircularProgress size={20} /> : <EditIcon />}
        </IconButtonStyled>
      </TableCell>
      <TableCell align="right">
        <IconButtonStyled onClick={() => handleDelete(item.id)} color="primary">
          {isApolloLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
        </IconButtonStyled>
      </TableCell>
    </TableRow>
  );
};

export default ItemRow;
