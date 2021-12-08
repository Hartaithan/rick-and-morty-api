import React from "react";
import "../styles/pagination.scss";
import { Pagination as BPagination } from "react-bootstrap";

function Pagination(props: any) {
  const { info, page, setPage, setLoading } = props;

  function changePage(page: number) {
    setLoading(true);
    setPage(page);
  }

  return (
    <>
      <BPagination>
        {page !== 1 && <BPagination.First onClick={() => changePage(1)} />}
        {page > 1 && <BPagination.Prev onClick={() => changePage(page - 1)} />}
        {page > 2 && (
          <BPagination.Item onClick={() => changePage(page - 2)}>
            {page - 2}
          </BPagination.Item>
        )}
        {page > 1 && (
          <BPagination.Item onClick={() => changePage(page - 1)}>
            {page - 1}
          </BPagination.Item>
        )}
        <BPagination.Item active>{page}</BPagination.Item>
        {page < info.pages && (
          <BPagination.Item onClick={() => changePage(page + 1)}>
            {page + 1}
          </BPagination.Item>
        )}
        {page < info.pages - 1 && (
          <BPagination.Item onClick={() => changePage(page + 2)}>
            {page + 2}
          </BPagination.Item>
        )}
        {page < info.pages && (
          <BPagination.Next onClick={() => changePage(page + 1)} />
        )}
        {page !== info.pages && (
          <BPagination.Last onClick={() => changePage(info.pages)} />
        )}
      </BPagination>
    </>
  );
}

export default Pagination;
