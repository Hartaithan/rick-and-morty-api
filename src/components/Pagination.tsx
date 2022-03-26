import React from "react";
import "../styles/pagination.scss";
import { Pagination as BPagination } from "react-bootstrap";
import { IPaginationProps } from "../models/PaginationModel";

const Pagination: React.FC<IPaginationProps> = (props) => {
  const { info, page, setPage, setLoading } = props;

  const changePage = (page: number) => {
    setLoading(true);
    setPage(page);
  };

  return (
    <div className="pagination_wrapper">
      {info && (
        <>
          <p className="pagination_page">Page: {page}</p>
          <BPagination>
            {page !== 1 && <BPagination.First onClick={() => changePage(1)} />}
            {page > 1 && (
              <BPagination.Prev onClick={() => changePage(page - 1)} />
            )}
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
          <p className="pagination_total">Total items: {info.count}</p>
        </>
      )}
    </div>
  );
};

export default Pagination;
