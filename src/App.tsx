import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import {
  Dialog,
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
  TextField,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useQuery, gql, useMutation } from "@apollo/client";
import { UserContext } from "./userProvider";
import { logOut } from "./firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

const TypographyStyled = styled(Typography)`
  padding-top: 10px;
`;

const TextFieldStyled = styled(TextField)`
marginLeft: theme.spacing.unit,
marginRight: theme.spacing.unit,
width: 200,
`;
const Wrapper = styled.div`
  text-align: center;
`;
const GroupFields = styled.div`
  margin: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190px;
`;
const TableContainerStyling = styled.div`
  width: 800px;
  padding-top: 10px;
  margin: auto;
`;
const IconButtonStyled = styled(IconButton)`
  padding: 0px !important;
`;
const SubmitButton = styled(Button)`
  margin-top: 15px !important;
`;
const ErrorMessage = styled.div`
  word-wrap: break-word !important;
`;
type ItemType = {
  id: string;
  name: string;
  amount: number;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

const ITEMS = gql`
  query GetBooks($userId: ID!) {
    items(userId: $userId) {
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

const CREATE_ITEM = gql`
  mutation CreateItem($userId: ID!, $item: CreateItem!) {
    createItem(userId: $userId, item: $item) {
      id
    }
  }
`;
const UPDATE_ITEM = gql`
  mutation UpdateItem($userId: ID!, $id: ID!, $item: UpdateItem!) {
    updateItem(userId: $userId, id: $id, item: $item) {
      id
    }
  }
`;
const DELETE_ITEM = gql`
  mutation DeleteItem($userId: ID!, $id: ID!) {
    deleteItem(userId: $userId, id: $id) {
      id
    }
  }
`;

const App = () => {
  const user: any = useContext(UserContext);
  const [redirect, setredirect] = useState<string | null>(null);
  const [mutationState, setMutationState] = React.useState<"create" | "update">(
    "create"
  );
  const [isModalVisible, setModalVisible] = React.useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    amount: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(1)
      .required("required"),
    calories: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    fat: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    carbs: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
    protein: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(0)
      .required("required"),
  });

  const { register, handleSubmit, getValues, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema), // yup, joi and even your own.
  });

  const [wishItem, setWishItem] = useState<{
    id?: string;
    name: string;
    amount: number;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  }>({
    name: "",
    amount: 1,
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  const { loading, error, data } = useQuery(ITEMS, {
    variables: { userId: user?.displayName },
    skip: !!!user,
  });

  const [createItem, { loading: createItemLoading }] = useMutation(
    CREATE_ITEM,
    { awaitRefetchQueries: true }
  );
  const [updateItem, { loading: updateItemLoading }] = useMutation(
    UPDATE_ITEM,
    { awaitRefetchQueries: true }
  );
  const [deleteItem, { loading: deleteItemLoading }] = useMutation(
    DELETE_ITEM,
    { awaitRefetchQueries: true }
  );

  useEffect(() => {
    if (!user) {
      setredirect("/login");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  const handleDelete = (id: string) => {
    // const copyOfRows = [...rows];
    // copyOfRows.splice(index, 1);
    // setRows(rows.filter(row=>row.));
    // setWishItem({ ...data.items[index] });
    deleteItem({
      variables: { userId: user?.displayName, id },
      refetchQueries: [
        { query: ITEMS, variables: { userId: user?.displayName } },
      ],
    });
  };
  const handleEdit = (id: string) => {
    setMutationState("update");
    setWishItem({ ...data.items.find((item: ItemType) => item.id === id) });
    setModalVisible(true);
  };
  const onSubmit = (data: any) => {
    console.log(data);

    const { name, amount, calories, fat, carbs, protein } = data;
    const payload = {
      name,
      amount: parseInt(amount, 10),
      calories: parseInt(calories, 10),
      fat: parseInt(fat, 10),
      carbs: parseInt(carbs, 10),
      protein: parseInt(protein, 10),
    };
    mutationState === "create"
      ? createItem({
          variables: { userId: user?.displayName, item: { ...payload } },
          refetchQueries: [
            { query: ITEMS, variables: { userId: user?.displayName } },
          ],
        })
      : updateItem({
          variables: {
            userId: user?.displayName,
            id: wishItem.id,
            item: { ...payload },
          },
          refetchQueries: [
            { query: ITEMS, variables: { userId: user?.displayName } },
          ],
        });
    setWishItem({
      name: "",
      amount: 1,
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    });
    setModalVisible(false);
  };

  const formatError = (errorMessage: string): string | React.ReactNode => {
    if (errorMessage) {
      console.log(errorMessage);

      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else {
      return "";
    }
  };
  const formatString = (value: string | number): string | number => {
    if (value === "0" || value === null || value === 0) {
      return "--";
    } else {
      return value;
    }
  };

  const apolloLoading =
    loading || createItemLoading || updateItemLoading || deleteItemLoading;

  return (
    <Wrapper>
      <Button onClick={logOut}>logout</Button>
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
              {data?.items.map((item: ItemType, index: number) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
                  <TableCell align="right">
                    {formatString(item.calories)}
                  </TableCell>
                  <TableCell align="right">{formatString(item.fat)}</TableCell>
                  <TableCell align="right">
                    {formatString(item.carbs)}
                  </TableCell>
                  <TableCell align="right">
                    {formatString(item.protein)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButtonStyled
                      onClick={() => handleEdit(item.id)}
                      color="primary"
                    >
                      {apolloLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <EditIcon />
                      )}
                    </IconButtonStyled>
                  </TableCell>
                  <TableCell align="right">
                    <IconButtonStyled
                      onClick={() => handleDelete(item.id)}
                      color="primary"
                    >
                      {apolloLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButtonStyled>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerStyling>
      <Dialog open={isModalVisible} onClose={() => setModalVisible(false)}>
        <form onSubmit={handleSubmit((data: any) => onSubmit(data))} noValidate>
          <GroupFields>
            <TextFieldStyled
              inputRef={register}
              defaultValue={mutationState === "update" ? wishItem.name : ""}
              id="name"
              label="Name"
              // value={wishItem.name}
              // onChange={handleChange("name")}
              name={"name"}
              margin="normal"
              error={!!errors?.name?.type}
              helperText={errors?.name?.message}
              required
            />
            <TextFieldStyled
              inputRef={register}
              defaultValue={mutationState === "update" ? wishItem.amount : 1}
              id="amount"
              label="Amount"
              type="number"
              // value={wishItem.amount}
              // onChange={handleChange("amount")}
              error={!!errors?.amount?.type}
              helperText={errors?.amount?.message}
              name={"amount"}
              margin="normal"
              required
            />
            <TextFieldStyled
              inputRef={register({
                required: true,
                validate: (value: any): any => {
                  console.log(value);
                },
              })}
              defaultValue={mutationState === "update" ? wishItem.calories : 0}
              id="calories"
              type="number"
              label="Calories"
              error={!!errors?.calories?.type}
              helperText={formatError(errors?.calories?.message)}
              name={"calories"}
              margin="normal"
              required
            />
            <TextFieldStyled
              inputRef={register}
              defaultValue={mutationState === "update" ? wishItem.fat : 0}
              id="fat"
              type="number"
              label="Fat"
              error={!!errors?.fat?.type}
              helperText={errors?.fat?.message}
              name={"fat"}
              margin="normal"
              required
            />
            <TextFieldStyled
              inputRef={register}
              defaultValue={mutationState === "update" ? wishItem.carbs : 0}
              id="carbs"
              type="number"
              label="Carbs"
              error={!!errors?.carbs?.type}
              helperText={errors?.carbs?.message}
              name={"carbs"}
              margin="normal"
              required
            />
            <TextFieldStyled
              inputRef={register}
              defaultValue={mutationState === "update" ? wishItem.protein : 0}
              id="protein"
              type="number"
              label="Protein"
              error={!!errors?.protein?.type}
              helperText={errors?.protein?.message}
              name={"protein"}
              margin="normal"
              required
            />
            <SubmitButton disabled={!isEmpty(errors)} type={"submit"}>
              submit
            </SubmitButton>
          </GroupFields>
        </form>
      </Dialog>
      <IconButton
        onClick={() => {
          setMutationState("create");
          setWishItem({
            name: "",
            amount: 1,
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
          });
          setModalVisible(true);
        }}
        color="primary"
      >
        {apolloLoading ? <CircularProgress size={20} /> : <AddIcon />}
      </IconButton>
    </Wrapper>
  );
};

export default App;
