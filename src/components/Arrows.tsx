import React from "react";
import "../styles/arrows.scss";

function Arrows(props: any) {
  const { page, setPage, setLoading } = props;

  function changePage(direction: string) {
    setLoading(true);
    switch (direction) {
      case "prev":
        setPage(page - 1);
        break;
      case "next":
        setPage(page + 1);
        break;
      default:
        return;
    }
  }

  return (
    <div className="arrows">
      <svg
        className="arrows_left"
        onClick={() => changePage("prev")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
      <svg
        className="arrows_right"
        onClick={() => changePage("next")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    </div>
  );
}

export default Arrows;
