import { makeAutoObservable } from "mobx";
import { IInputs } from "../models/InputsModel";

class Filters {
  inputs: IInputs = {
    name: "",
    type: "",
    species: "",
    status: "",
    gender: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  persistParams(params: URLSearchParams) {
    this.inputs.name = params.get("name") || "";
    this.inputs.type = params.get("type") || "";
    this.inputs.species = params.get("species") || "";
    this.inputs.status = params.get("status") || "";
    this.inputs.gender = params.get("gender") || "";
  }

  setValue(key: string, value: string) {
    this.inputs[key] = value;
  }
}

export default new Filters();
