import "./styles/global.scss";
import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Filters from "./components/Filters";
import List from "./components/List";
import DetailModal from "./components/DetailModal";
import Pagination from "./components/Pagination";
import {
  characterTypes,
  infoTypes,
  inputsTypes,
  modalTypes,
  pageTypes,
  paramsType,
} from "./types";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<characterTypes[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [info, setInfo] = React.useState<infoTypes>({
    count: null,
    next: null,
    pages: null,
    prev: null,
  });
  const [page, setPage] = React.useState<pageTypes>(1);
  const [modal, setModal] = React.useState<modalTypes>({
    id: null,
    isShow: false,
    isLoading: true,
  });
  const [inputs, setInputs] = React.useState<inputsTypes>({
    name: searchParams.get("name") || "",
    type: searchParams.get("type") || "",
    species: searchParams.get("species") || "",
    status: searchParams.get("status") || "",
    gender: searchParams.get("gender") || "",
  });

  function generateParams() {
    const object: paramsType = {};
    if (page) {
      object.page = page.toString();
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
  }

  function getCharacters() {
    setLoading(true);
    const params = generateParams();
    axios
      .get(`https://rickandmortyapi.com/api/character/`, { params })
      .then(({ data }) => {
        setInfo(data.info);
        setCharacters(data.results);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getCharacters();
  }, [page]); // eslint-disable-line

  React.useEffect(() => {
    const queries = generateParams();
    setSearchParams(queries);
  }, [inputs, page]); // eslint-disable-line

  function handleSubmit() {
    setPage(1);
    getCharacters();
  }

  return (
    <div className="App">
      <Container>
        <Filters
          handleSubmit={handleSubmit}
          inputs={inputs}
          setInputs={setInputs}
        />
        {isLoading ? (
          <div className="loader">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <List characters={characters} modal={modal} setModal={setModal} />
        )}
        <DetailModal modal={modal} setModal={setModal} />
        <Pagination
          info={info}
          page={page}
          setPage={setPage}
          setLoading={setLoading}
        />
      </Container>
    </div>
  );
}

export default App;
