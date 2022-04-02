export interface IModalState {
  id: number | null;
  isShow: boolean;
  isLoading: boolean;
}

export interface IModals {
  [key: string]: boolean;
}

export interface IDetailModalProps {
  modal: IModalState;
  setModal: React.Dispatch<React.SetStateAction<IModalState>>;
}
