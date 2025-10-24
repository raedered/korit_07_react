import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addShopping } from "../api/shoppingApi";
import { ChangeEvent, useState } from "react";
import { Shopping } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import ShoppingdialogContent from "./ShoppingDialogContent";

function AddShopping() {
  const [ open, setOpen ] = useState(false);
  const [ shopping, setShopping] = useState<Shopping>({
    product: '',
    amount:0
  });

  const handleClickOpen = () => setOpen(true);

  const handleClickClose = () => setOpen(false);

  const handleChange = () => (event: ChangeEvent<HTMLInputElement>) => {
    setShopping({...shopping, [event.target.name]: event.target.value});
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addShopping, {
    onSuccess: () => {
      queryClient.invalidateQueries(["shoppings"]);
    },
    onError: err => {
      console.log(err)
    }
  })

  const handleSave = () => {
    mutate(shopping)
    setShopping({
      product: '',
      amount:0
    });
    handleClickClose();
  }

  return (
    <>
      <Button onClick={handleClickOpen}>New</Button>
      <Dialog open={open}>
        <DialogTitle>New Shopping</DialogTitle>
        <ShoppingdialogContent shopping={shopping} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Save | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  )
  
}

export default AddShopping