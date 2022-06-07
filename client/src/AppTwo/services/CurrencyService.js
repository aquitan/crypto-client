import {COINS_API} from "../API";
import axios from "axios";

export const getRate = () => {
    return axios.get(COINS_API)
}