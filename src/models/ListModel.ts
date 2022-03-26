import { ICharacter } from "./CharacterModel";
import { IModalState } from "./DetailModalModel";

export interface IListProps {
  characters: ICharacter[];
  modal: IModalState;
  setModal: React.Dispatch<React.SetStateAction<IModalState>>;
}
