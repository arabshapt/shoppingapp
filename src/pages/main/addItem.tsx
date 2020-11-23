import React, { useContext } from "react";
import { MutationTuple } from "@apollo/client";
import { Button, Dialog, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import {
  CreateItem,
  CreateItemMutation,
  Exact,
  ReadItemsDocument,
  UpdateItem,
  UpdateItemMutation,
} from "../../generated/graphql";
import { UserContext } from "../../userProvider";
import { ItemType, initialItemValues } from "./index";
import { useForm } from "react-hook-form";
import { validationSchema } from "./validationSchemata";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

const ErrorMessage = styled.div`
  word-wrap: break-word !important;
`;
const SubmitButton = styled(Button)`
  margin-top: 15px !important;
`;

const GroupFields = styled.div`
  margin: 20px;
  margin-top: 0px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190px;
`;

const TextFieldStyled = styled(TextField)`
  marginleft: theme.spacing.unit;
  marginright: theme.spacing.unit;
  width: 200;
`;

const TypographyStyled = styled(Typography)`
  padding-top: 10px;
  text-align: center;
  margin-top: 10px !important;
`;

interface AddItemDialogProps {
  mutationState: "update" | "create";
  wishItem: ItemType;
  setWishItem: (value: ItemType) => void;
  setModalVisible: (value: boolean) => void;
  isModalVisible: boolean;
  createMutation: MutationTuple<
    CreateItemMutation,
    Exact<{
      userId: string;
      item: CreateItem;
    }>
  >;
  updateMutation: MutationTuple<
    UpdateItemMutation,
    Exact<{
      userId: string;
      id: string;
      item: UpdateItem;
    }>
  >;
}

const AddItemDialog = ({
  mutationState,
  createMutation,
  updateMutation,
  setModalVisible,
  isModalVisible,
  wishItem,
  setWishItem,
}: AddItemDialogProps) => {
  const user: any = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const [createItem] = createMutation;
  const [updateItem] = updateMutation;

  const onSubmit = (data: any) => {
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
            {
              query: ReadItemsDocument,
              variables: { userId: user?.displayName },
            },
          ],
        })
      : updateItem({
          variables: {
            userId: user?.displayName,
            id: wishItem.id,
            item: { ...payload },
          },
          refetchQueries: [
            {
              query: ReadItemsDocument,
              variables: { userId: user?.displayName },
            },
          ],
        });
    setWishItem({ ...initialItemValues });
    setModalVisible(false);
  };

  return (
    <Dialog open={isModalVisible} onClose={() => setModalVisible(false)}>
      <TypographyStyled>
        {mutationState === "create" ? "Create Item" : "Edit Item"}
      </TypographyStyled>
      <form onSubmit={handleSubmit((data: any) => onSubmit(data))} noValidate>
        <GroupFields>
          <TextFieldStyled
            inputRef={register}
            defaultValue={mutationState === "update" ? wishItem.name : ""}
            id="name"
            label="Name"
            name={"name"}
            margin="normal"
            error={!!errors?.name?.type}
            helperText={<ErrorMessage>{errors?.name?.message}</ErrorMessage>}
            required
          />
          <TextFieldStyled
            inputRef={register}
            defaultValue={mutationState === "update" ? wishItem.amount : 1}
            id="amount"
            label="Amount"
            type="number"
            error={!!errors?.amount?.type}
            helperText={<ErrorMessage>{errors?.amount?.message}</ErrorMessage>}
            name={"amount"}
            margin="normal"
            required
          />
          <TextFieldStyled
            inputRef={register}
            defaultValue={mutationState === "update" ? wishItem.calories : 0}
            id="calories"
            type="number"
            label="Calories"
            error={!!errors?.calories?.type}
            helperText={
              <ErrorMessage>{errors?.calories?.message}</ErrorMessage>
            }
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
            helperText={<ErrorMessage>{errors?.fat?.message}</ErrorMessage>}
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
            helperText={<ErrorMessage>{errors?.carbs?.message}</ErrorMessage>}
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
            helperText={<ErrorMessage>{errors?.protein?.message}</ErrorMessage>}
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
  );
};
export default AddItemDialog;
