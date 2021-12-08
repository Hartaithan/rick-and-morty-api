import React from "react";
import "../styles/pagination.scss";
import { Pagination as BPagination } from "react-bootstrap";

function Pagination(props: any) {
  const { info, page, setPage, setLoading } = props;

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
    <div className="pagination">
      <BPagination>
        <BPagination.First />
        <BPagination.Prev />
        <BPagination.Item>{1}</BPagination.Item>
        <BPagination.Ellipsis />

        <BPagination.Item>{10}</BPagination.Item>
        <BPagination.Item>{11}</BPagination.Item>
        <BPagination.Item active>{12}</BPagination.Item>
        <BPagination.Item>{13}</BPagination.Item>
        <BPagination.Item disabled>{14}</BPagination.Item>

        <BPagination.Ellipsis />
        <BPagination.Item>{20}</BPagination.Item>
        <BPagination.Next />
        <BPagination.Last />
      </BPagination>
    </div>
  );
}

export default Pagination;
