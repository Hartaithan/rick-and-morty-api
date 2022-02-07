import React from "react";
import { URLSearchParamsInit } from "react-router-dom";

export type modalTypes = {
  id: number | null;
  isShow: boolean;
  isLoading: boolean;
};

export type characterTypes = {
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

export type infoTypes = {
  count: number | null;
  next: string | null;
  pages: number | null;
  prev: string | null;
};

export type loadingTypes = boolean;

export type pageTypes = number;

export type paramsType = {
  page?: number | null;
  name?: string | null;
  type?: string | null;
  species?: string | null;
  status?: string | null;
  gender?: string | null;
};

export interface DetailModalProps {
  modal: modalTypes;
  setModal: React.Dispatch<React.SetStateAction<modalTypes>>;
}

export interface FilterProps {
  handleSubmit: () => void;
  inputs: inputsTypes;
  setInputs: React.Dispatch<React.SetStateAction<inputsTypes>>;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean; state?: any }
  ) => void;
}

export interface ListProps {
  characters: characterTypes[];
  modal: modalTypes;
  setModal: React.Dispatch<React.SetStateAction<modalTypes>>;
}

export interface PaginationProps {
  info: infoTypes;
  page: pageTypes;
  setPage: React.Dispatch<React.SetStateAction<pageTypes>>;
  setLoading: React.Dispatch<React.SetStateAction<loadingTypes>>;
}
