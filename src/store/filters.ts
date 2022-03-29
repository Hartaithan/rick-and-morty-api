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

  setValue(key: string, value: string) {
    this.inputs[key] = value;
  }
}

export default new Filters();
