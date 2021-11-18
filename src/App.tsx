import "./styles/global.scss";
import React from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import Filters from "./components/Filters";
import List from "./components/List";
import DetailModal from "./components/DetailModal";
import Arrows from "./components/Arrows";
import Info from "./components/Info";

function App() {
  const [characters, setCharacters] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [modal, setModal] = React.useState({
    id: null,
    isShow: false,
    isLoading: true,
  });
  const [inputs, setInputs] = React.useState({
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
      <Arrows
        info={info}
        page={page}
        setPage={setPage}
        setLoading={setLoading}
      />
      <Container>
        <Filters
          handleSubmit={handleSubmit}
          inputs={inputs}
          setInputs={setInputs}
        />
        <Info info={info} page={page} />
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
      </Container>
    </div>
  );
}

export default App;
