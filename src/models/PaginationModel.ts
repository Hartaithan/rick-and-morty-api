import { IInfoState } from "./InfoModel";

export interface IPaginationProps {
  info: IInfoState;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
