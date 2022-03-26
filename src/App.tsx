import "./global.scss";
import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Filters from "./components/Filters/Filters";
import List from "./components/List/List";
import DetailModal from "./components/DetailModal/DetailModal";
import Pagination from "./components/Pagination/Pagination";
import { IInfoState } from "./models/InfoModel";
import { IInputsState } from "./models/InputsModel";
import { ICharacter } from "./models/CharacterModel";
import { ParamsType } from "./models/ParamsModel";
import { IModalState } from "./models/DetailModalModel";
import Loader from "./components/Loader/Loader";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [info, setInfo] = React.useState<IInfoState>({
    count: null,
    next: null,
    pages: null,
    prev: null,
  });
  const [page, setPage] = React.useState<number>(1);
  const [modal, setModal] = React.useState<IModalState>({
    id: null,
    isShow: false,
    isLoading: true,
  });
  const [inputs, setInputs] = React.useState<IInputsState>({
    name: searchParams.get("name") || "",
    type: searchParams.get("type") || "",
    species: searchParams.get("species") || "",
    status: searchParams.get("status") || "",
    gender: searchParams.get("gender") || "",
  });

  const generateParams = () => {
    const object: ParamsType = {};
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
  };

  const getCharacters = () => {
    setLoading(true);
    const params = generateParams();
    axios
      .get(`https://rickandmortyapi.com/api/character/`, { params })
      .then(({ data }) => {
        setInfo(data.info);
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response.data.error === "There is nothing here") {
          setInfo(null);
          setCharacters([]);
        }
        setLoading(false);
        console.error(response.data || response);
      });
  };

  const handleSubmit = () => {
    setPage(1);
    const queries = generateParams();
    setSearchParams(queries);
    getCharacters();
  };

  React.useEffect(() => {
    getCharacters();
  }, [page]); // eslint-disable-line

  return (
    <div className="App">
      <Container>
        <Filters
          handleSubmit={handleSubmit}
          inputs={inputs}
          setInputs={setInputs}
        />
        {isLoading ? (
          <Loader />
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
};

export default App;
