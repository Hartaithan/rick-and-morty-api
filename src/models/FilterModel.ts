import { IInputsState } from "./InputsModel";

export interface IFilterProps {
  handleSubmit: () => void;
  inputs: IInputsState;
  setInputs: React.Dispatch<React.SetStateAction<IInputsState>>;
}
