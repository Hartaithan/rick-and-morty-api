import "./global.scss";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Filters from "./components/Filters/Filters";
import List from "./components/List/List";
import DetailModal from "./components/DetailModal/DetailModal";
import Pagination from "./components/Pagination/Pagination";
import { IInputsState } from "./models/InputsModel";
import { ParamsType } from "./models/ParamsModel";
import Loader from "./components/Loader/Loader";
import API from "./api";
import characters from "./store/characters";
import { observer } from "mobx-react-lite";
import page from "./store/page";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [inputs, setInputs] = React.useState<IInputsState>({
    name: searchParams.get("name") || "",
    type: searchParams.get("type") || "",
    species: searchParams.get("species") || "",
    status: searchParams.get("status") || "",
    gender: searchParams.get("gender") || "",
  });

  const generateParams = () => {
    const object: ParamsType = {};
    if (page.current) {
      object.page = page.current.toString();
    }
    if (inputs.name) {
      object.name = inputs.name;
    }
    if (inputs.type) {
      object.type = inputs.type;
    }
    if (inputs.species) {
      object.species = inputs.species;
    }
    if (inputs.status) {
      object.status = inputs.status;
    }
    if (inputs.gender) {
      object.gender = inputs.gender;
    }
    return object;
  };

  const getCharacters = () => {
    setLoading(true);
    const params = generateParams();
    API.get("/character", { params })
      .then(({ data }) => {
        page.setInfo(data.info);
        characters.set(data.results);
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response.data.error === "There is nothing here") {
          page.resetInfo();
          characters.clear();
        }
        setLoading(false);
        console.error(response.data || response);
      });
  };

  const handleSubmit = () => {
    page.setPage(1);
    const queries = generateParams();
    setSearchParams(queries);
    getCharacters();
  };

  React.useEffect(() => {
    getCharacters();
  }, [page.current]); // eslint-disable-line

  return (
    <Container>
      <Filters
        handleSubmit={handleSubmit}
        inputs={inputs}
        setInputs={setInputs}
      />
      {isLoading ? <Loader /> : <List />}
      <DetailModal />
      <Pagination setLoading={setLoading} />
    </Container>
  );
};

export default observer(App);
