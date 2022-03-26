import axios from "axios";

const config = {
  baseURL: `https://rickandmortyapi.com/api`,
};

const API = axios.create(config);

export default API;
