import axios from "axios";
import { Shopping } from "../types";

const API_URL = `${import.meta.env.VITE_API_URL}/api/shopping`;
console.log(API_URL)

export const getShoppings = async (): Promise<Shopping[]> => {
  const response = await axios.get(API_URL, {
    headers: {"Content-Type": "application/json"}
  });
  return response.data;
}

export const addShopping = async (shopping: Omit<Shopping, "id">): Promise<Shopping> => {
  const response = await axios.post(API_URL, shopping, {
    headers: { "Content-Type" : "application/json"}
  })
  return response.data;
}