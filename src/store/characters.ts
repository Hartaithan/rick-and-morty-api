import { makeAutoObservable } from "mobx";
import API, { generateParams } from "../api";
import { ICharacter } from "../models/CharacterModel";
import page from "./page";

class Characters {
  isLoading: boolean = true;
  list: ICharacter[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get() {
    this.isLoading = true;
    const params = generateParams();
    API.get("/character", { params })
      .then(({ data }) => {
        page.setInfo(data.info);
        this.set(data.results);
        this.isLoading = false;
      })
      .catch(({ response }) => {
        if (response.data.error === "There is nothing here") {
          page.resetInfo();
          this.clear();
        }
        this.isLoading = false;
        console.error(response.data || response);
      });
  }

  set(list: ICharacter[]) {
    this.list = list;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  clear() {
    this.list = [];
  }
}

export default new Characters();
