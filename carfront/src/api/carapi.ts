import axios from "axios";
import { CarResponse } from "../types";

const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get("http://localhost:8080/api/cars");

    return response.data._embedded.cars;
}

export default getCars