import { makeAutoObservable } from "mobx";

export enum ModalTypes {
  Detail = "detail",
}

class Modals {
  id: number | null = null;
  detail: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  open(modal: string, id?: number) {
    if (id) {
      this.id = id;
    }
    switch (modal) {
      case ModalTypes.Detail:
        this.detail = true;
        break;
      default:
        break;
    }
  }

  close(modal: string) {
    switch (modal) {
      case ModalTypes.Detail:
        this.id = null;
        this.detail = false;
        break;
      default:
        break;
    }
  }

  closeAll() {
    this.id = null;
    this.detail = false;
  }
}

export default new Modals();
