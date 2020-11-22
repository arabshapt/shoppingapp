import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../../userProvider";
import { logOut } from "../../firebase";
import {
  useReadItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  Item,
} from "../../generated/graphql";
import { Alert, AlertTitle } from "@material-ui/lab";
import ItemRow from "./tableRow";
import AddItemDialog from "./addItem";

const TypographyStyled = styled(Typography)`
  padding-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TableContainerStyling = styled.div`
  width: 800px;
  padding-top: 10px;
  margin: auto;
`;

const AlertStyled = styled(Alert)`
  min-width: 150px;
`;

export type ItemType = {
  id: string;
  name: string;
  amount: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};
export const initialItemValues = {
  id: "",
  name: "",
  amount: 1,
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
};
const MainPage = () => {
  const user: any = useContext(UserContext);
  const [redirect, setredirect] = useState<string | null>(null);
  const [mutationState, setMutationState] = React.useState<"create" | "update">(
    "create"
  );
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [wishItem, setWishItem] = useState<ItemType>({ ...initialItemValues });

  const { data, loading, error: errorReadItemsMutation } = useReadItemsQuery({
    variables: { userId: user?.displayName },
    skip: !!!user,
  });

  const items = data?.readItems ?? [];

  const createMutation = useCreateItemMutation({
    awaitRefetchQueries: true,
  });
  const updateMutation = useUpdateItemMutation({
    awaitRefetchQueries: true,
  });
  const deleteMutation = useDeleteItemMutation({
    awaitRefetchQueries: true,
  });
  const [
    ,
    { loading: createItemLoading, error: errorCreateItemMutation },
  ] = createMutation;
  const [
    ,
    { loading: updateItemLoading, error: errorUpdateItemMutation },
  ] = updateMutation;
  const [
    ,
    { loading: deleteItemLoading, error: errorDeleteItemMutation },
  ] = deleteMutation;

  useEffect(() => {
    if (!user) {
      setredirect("/login");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const isApolloLoading =
    loading || createItemLoading || updateItemLoading || deleteItemLoading;

  const hasErrorOccured =
    errorReadItemsMutation ||
    errorCreateItemMutation ||
    errorUpdateItemMutation ||
    errorDeleteItemMutation;

  return (
    <Wrapper>
      <Button onClick={logOut}>logout</Button>
      {hasErrorOccured && (
        <AlertStyled severity="error">
          <AlertTitle>Error</AlertTitle>
          <div>{errorReadItemsMutation?.message}</div>
          <div>{errorCreateItemMutation?.message}</div>
          <div>{errorUpdateItemMutation?.message}</div>
          <div>{errorDeleteItemMutation?.message}</div>
        </AlertStyled>
      )}
      <TypographyStyled>Shopping List</TypographyStyled>
      <TableContainerStyling>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product (100g serving)</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: Item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  data={data}
                  deleteMutation={deleteMutation}
                  isApolloLoading={isApolloLoading}
                  setMutationState={setMutationState}
                  setWishItem={setWishItem}
                  setModalVisible={setModalVisible}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerStyling>
      <AddItemDialog
        wishItem={wishItem}
        mutationState={mutationState}
        setWishItem={setWishItem}
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
      <IconButton
        onClick={() => {
          setMutationState("create");
          setWishItem({ ...initialItemValues });
          setModalVisible(true);
        }}
        color="primary"
      >
        {isApolloLoading ? <CircularProgress size={20} /> : <AddIcon />}
      </IconButton>
    </Wrapper>
  );
};

export default MainPage;
