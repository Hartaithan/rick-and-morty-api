import "./global.scss";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Filters from "./components/Filters/Filters";
import List from "./components/List/List";
import DetailModal from "./components/DetailModal/DetailModal";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";
import { generateParams } from "./api";
import characters from "./store/characters";
import { observer } from "mobx-react-lite";
import page from "./store/page";
import filters from "./store/filters";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = () => {
    page.setPage(1);
    const queries = generateParams();
    setSearchParams(queries);
    characters.get();
  };

  React.useEffect(() => {
    filters.persistParams(searchParams);
  }, []); // eslint-disable-line

  React.useEffect(() => {
    characters.get();
  }, [page.current]); // eslint-disable-line

  return (
    <Container>
      <Filters handleSubmit={handleSubmit} />
      {characters.isLoading ? <Loader /> : <List />}
      <DetailModal />
      <Pagination />
    </Container>
  );
};

export default observer(App);
