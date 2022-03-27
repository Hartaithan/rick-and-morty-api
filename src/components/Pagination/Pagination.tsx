import React from "react";
import "./pagination.scss";
import { Pagination as BPagination } from "react-bootstrap";
import { IPaginationProps } from "../../models/PaginationModel";
import page from "../../store/page";
import { observer } from "mobx-react-lite";

const Pagination: React.FC<IPaginationProps> = (props) => {
  const { setLoading } = props;

  const changePage = (nextPage: number) => {
    setLoading(true);
    page.setPage(nextPage);
  };

  return (
    <div className="pagination__wrapper">
      <p className="pagination__page">Page: {page.current}</p>
      <BPagination>
        {page.current !== 1 && (
          <BPagination.First onClick={() => changePage(1)} />
        )}
        {page.current > 1 && (
          <BPagination.Prev onClick={() => changePage(page.current - 1)} />
        )}
        {page.current > 2 && (
          <BPagination.Item onClick={() => changePage(page.current - 2)}>
            {page.current - 2}
          </BPagination.Item>
        )}
        {page.current > 1 && (
          <BPagination.Item onClick={() => changePage(page.current - 1)}>
            {page.current - 1}
          </BPagination.Item>
        )}
        <BPagination.Item active>{page.current}</BPagination.Item>
        {page.current < page.pages && (
          <BPagination.Item onClick={() => changePage(page.current + 1)}>
            {page.current + 1}
          </BPagination.Item>
        )}
        {page.current < page.pages - 1 && (
          <BPagination.Item onClick={() => changePage(page.current + 2)}>
            {page.current + 2}
          </BPagination.Item>
        )}
        {page.current < page.pages && (
          <BPagination.Next onClick={() => changePage(page.current + 1)} />
        )}
        {page.current !== page.pages && (
          <BPagination.Last onClick={() => changePage(page.pages)} />
        )}
      </BPagination>
      <p className="pagination__total">Total items: {page.count}</p>
    </div>
  );
};

export default observer(Pagination);
