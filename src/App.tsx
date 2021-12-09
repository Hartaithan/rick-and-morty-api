import "./styles/global.scss";
import React from "react";
import axios from "axios";
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
} from "./types";

function App() {
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
    name: "",
    type: "",
    species: "",
    status: "",
    gender: "",
  });

  function getCharacters() {
    setLoading(true);
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${inputs.name}&type=${inputs.type}&species=${inputs.species}&status=${inputs.status}&gender=${inputs.gender}`
      )
      .then(({ data }) => {
        setInfo(data.info);
        setCharacters(data.results);
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getCharacters();
  }, [page]); // eslint-disable-line

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
