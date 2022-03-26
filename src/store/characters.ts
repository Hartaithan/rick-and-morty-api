import { makeAutoObservable } from "mobx";
import { ICharacter } from "../models/CharacterModel";

class Characters {
  list: ICharacter[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  set(list: ICharacter[]) {
    this.list = list;
  }

  clear() {
    this.list = [];
  }
}

export default new Characters();
