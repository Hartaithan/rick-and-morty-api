import React from "react";

export type modalTypes = {
  id: number | null;
  isShow: boolean;
  isLoading: boolean;
};

export type detailsReponse = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type inputsTypes = {
  name: string;
  type: string;
  species: string;
  status: string;
  gender: string;
};

export interface DetailModalProps {
  modal: modalTypes;
  setModal: React.Dispatch<React.SetStateAction<modalTypes>>;
}

export interface FilterProps {
  handleSubmit: () => void;
  inputs: inputsTypes;
  setInputs: React.Dispatch<React.SetStateAction<inputsTypes>>;
}
