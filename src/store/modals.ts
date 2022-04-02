import { makeAutoObservable } from "mobx";
import { IModals } from "../models/ModalModel";

export enum ModalTypes {
  Detail = "detail",
}

class Modals {
  id: number | null = null;
  values: IModals = {
    detail: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  open(modal: string, id?: number) {
    if (id) {
      this.id = id;
    }
    this.values[modal] = true;
  }

  close(modal: string) {
    this.id = null;
    this.values[modal] = false;
  }

  closeAll() {
    this.id = null;
    Object.keys(this.values).forEach((key) => {
      console.log(key);
      this.values[key] = false;
    });
  }
}

export default new Modals();
