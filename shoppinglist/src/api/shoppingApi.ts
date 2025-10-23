import axios from "axios";
import { ShoppingResponse } from "../types";

export const getShoppings = async (): Promise<ShoppingResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api`)

  return response.data._embedded.shoppings;
}