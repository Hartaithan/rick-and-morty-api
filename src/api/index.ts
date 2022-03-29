import axios from "axios";
import { ParamsType } from "../models/ParamsModel";
import filters from "../store/filters";
import page from "../store/page";

const config = {
  baseURL: `https://rickandmortyapi.com/api`,
};

export const generateParams = () => {
  const object: ParamsType = {};
  const filtersKeys = ["name", "type", "species", "status", "gender"];
  if (page.current) {
    object.page = page.current.toString();
  }
  for (let i = 0; i < filtersKeys.length; i++) {
    const key = filtersKeys[i];
    if (filters.inputs[key]) {
      object[key] = filters.inputs[key];
    }
  }
  return object;
};

const API = axios.create(config);

export default API;
