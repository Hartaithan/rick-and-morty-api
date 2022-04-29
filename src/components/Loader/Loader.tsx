import React from "react";
import { Spinner } from "react-bootstrap";
import { ILoaderProps } from "../../models/LoaderModel";

const Loader: React.FC<ILoaderProps> = (props) => {
  const { className = "" } = props;
  return (
    <div className={`loader ${className}`}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
