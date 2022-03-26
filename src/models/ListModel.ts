import { IModalState } from "./ModalModel";

export interface IListProps {
  modal: IModalState;
  setModal: React.Dispatch<React.SetStateAction<IModalState>>;
}
