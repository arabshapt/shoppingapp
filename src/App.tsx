import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

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
  margin: 10px;
  display: flex;
  flex-direction: column;
`;
const TableContainerStyling = styled.div`
  width: 700px;
  padding-top: 10px;
  margin: auto;
`;
const IconButtonStyled = styled(IconButton)`
  padding: 0px !important;
`;

const App = () => {
  const { register } = useForm();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [wishItem, setWishItem] = useState<{
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
  const [rows, setRows] = useState<
    {
      name: string;
      amount: number;
      calories?: number;
      fat?: number;
      carbs?: number;
      protein?: number;
    }[]
  >([]);

  const handleChange = (name: string) => (event: any) => {
    setWishItem({ ...wishItem, [name]: event.target.value });
  };

  const handleDelete = (index: number) => {
    const copyOfRows = [...rows];
    copyOfRows.splice(index,1);    
    setRows(copyOfRows);
  }
  console.log(wishItem);

  const createData = (
    name: string,
    amount: number,
    calories?: number,
    fat?: number,
    carbs?: number,
    protein?: number
  ): {
    name: string;
    amount: number;
    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;
  } => {
    return { name, amount, calories, fat, carbs, protein };
  };

  useEffect(() => {
    setRows([
      createData("Frozen yoghurt1", 3, 159, 6.0, 24, 4.0),
      createData("Ice cream sandwich", 3, 237, 9.0, 37, 4.3),
      createData("Eclair", 3, 262, 16.0, 24, 6.0),
      createData("Cupcake", 3, 305, 3.7, 67, 4.3),
      createData("Gingerbread", 3, 356, 16.0, 49, 3.9),
    ]);
  }, [setRows]);

  return (
    <Wrapper>
      <TypographyStyled>Shopping List</TypographyStyled>
      <TableContainerStyling>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    {row.calories === 0 ? "--" : row.calories}
                  </TableCell>
                  <TableCell align="right">
                    {row.fat === 0 ? "--" : row.fat}
                  </TableCell>
                  <TableCell align="right">
                    {row.carbs === 0 ? "--" : row.carbs}
                  </TableCell>
                  <TableCell align="right">
                    {row.protein === 0 ? "--" : row.protein}
                  </TableCell>
                  <TableCell align="right">
                    <IconButtonStyled
                      onClick={() => handleDelete(index)}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButtonStyled>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerStyling>
      <Dialog open={isModalVisible} onClose={() => setModalVisible(false)}>
        <GroupFields>
          <TextFieldStyled
            inputRef={register}
            id="standard-name"
            label="Name"
            value={wishItem.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextFieldStyled
            inputRef={register}
            id="standard-amount"
            label="Amount"
            type="number"
            value={wishItem.amount}
            onChange={handleChange("amount")}
            margin="normal"
          />
          <TextFieldStyled
            inputRef={register}
            id="standard-calories"
            type="number"
            label="Calories"
            value={wishItem.calories}
            onChange={handleChange("calories")}
            margin="normal"
          />
          <TextFieldStyled
            inputRef={register}
            id="standard-fat"
            type="number"
            label="Fat"
            value={wishItem.fat}
            onChange={handleChange("fat")}
            margin="normal"
          />
          <TextFieldStyled
            inputRef={register}
            id="standard-carbs"
            type="number"
            label="Carbs"
            value={wishItem.carbs}
            onChange={handleChange("carbs")}
            margin="normal"
          />
          <TextFieldStyled
            inputRef={register}
            id="standard-protein"
            type="number"
            label="Protein"
            value={wishItem.protein}
            onChange={handleChange("protein")}
            margin="normal"
          />
        </GroupFields>
        <Button
          onClick={() => {
            setRows([...rows, { ...wishItem }]);
            setWishItem({
              name: "",
              amount: 0,
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0,
            });
            setModalVisible(false);
          }}
        >
          submit
        </Button>
        {/* <Button onClick={() => setModalVisible(false)}>open modal</Button> */}
      </Dialog>
      <IconButton onClick={() => setModalVisible(true)} color="primary">
        <AddIcon />
      </IconButton>
      {/* <Button onClick={() => setModalVisible(true)}>open modal</Button> */}
    </Wrapper>
  );
};

export default App;
