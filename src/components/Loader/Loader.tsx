import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = (props) => {
  return (
    <div className="loader" {...props}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
