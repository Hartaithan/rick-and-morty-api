import "./styles/global.scss";
import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Filters from "./components/Filters";
import List from "./components/List";

function App() {
  const [characters, setCharacters] = React.useState([]);
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
    });
  }

  React.useEffect(() => {
    getCharacters();
  }, []);

  function handleSumbit() {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${inputs.name}&type=${inputs.type}&species=${inputs.species}&status=${inputs.status}&gender=${inputs.gender}`
      )
      .then(({ data }) => {
        setCharacters(data.results);
      });
  }

  return (
    <div className="App">
      <Container>
        <Filters
          handleSumbit={handleSumbit()}
          inputs={inputs}
          setInputs={setInputs}
        />
        <List characters={characters} />
      </Container>
    </div>
  );
}

export default App;
