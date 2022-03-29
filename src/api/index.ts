import axios from "axios";
import { ParamsType } from "../models/ParamsModel";
import filters from "../store/filters";
import page from "../store/page";

const config = {
  baseURL: `https://rickandmortyapi.com/api`,
};

export const generateParams = () => {
  const object: ParamsType = {};
  if (page.current) {
    object.page = page.current.toString();
  }
  if (filters.inputs.name) {
    object.name = filters.inputs.name;
  }
  if (filters.inputs.type) {
    object.type = filters.inputs.type;
  }
  if (filters.inputs.species) {
    object.species = filters.inputs.species;
  }
  if (filters.inputs.status) {
    object.status = filters.inputs.status;
  }
  if (filters.inputs.gender) {
    object.gender = filters.inputs.gender;
  }
  return object;
};

const API = axios.create(config);

export default API;
