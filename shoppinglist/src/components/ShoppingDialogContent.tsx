import { DialogContent, Stack, TextField } from "@mui/material";
import { Shopping } from "../types"
import { ChangeEvent } from "react";

type DialogFromProps = {
  shopping : Shopping;
  handleChange: (event: ChangeEvent<HTMLInputElement>) =>
    void;
}

function ShoppingdialogContent({shopping, handleChange}: DialogFromProps) {
  return(
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField label="Product" name="product" value={shopping.product} onChange={handleChange} />
        <TextField label="Amount" name="amount" value={shopping.amount} onChange={handleChange} />
      </Stack>
    </DialogContent>
  )
}

export default ShoppingdialogContent;