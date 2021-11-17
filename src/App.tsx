import "./styles/global.scss";
import React from "react";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import Filters from "./components/Filters";
import List from "./components/List";
import DetailModal from "./components/DetailModal";

function App() {
  const [characters, setCharacters] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
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
    axios.get("https://rickandmortyapi.com/api/character").then(({ data }) => {
      setCharacters(data.results);
      setLoading(false);
    });
  }

  React.useEffect(() => {
    getCharacters();
  }, []);

  function handleSubmit() {
    setLoading(true);
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${inputs.name}&type=${inputs.type}&species=${inputs.species}&status=${inputs.status}&gender=${inputs.gender}`
      )
      .then(({ data }) => {
        setCharacters(data.results);
        setLoading(false);
      });
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
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <List characters={characters} modal={modal} setModal={setModal} />
        )}
        <DetailModal modal={modal} setModal={setModal} />
      </Container>
    </div>
  );
}

export default App;
