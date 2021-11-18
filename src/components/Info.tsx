import React from "react";
import "../styles/info.scss";

function Info(props: any) {
  const { info, page } = props;
  return (
    <div className="info">
      <p>Page: {page}</p>
      <p>Total items: {info.count}</p>
    </div>
  );
}

export default Info;
