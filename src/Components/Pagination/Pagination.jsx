import React, { useContext, useRef } from 'react';
import {
  Pagination,
} from 'react-bootstrap';

export default function PaginationBasic({ paginate, totalPages, pageAtual }) {
  const active = pageAtual;
  const pageNumbers = [];

  for (let number = 1; number <= totalPages; number++) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>
      {/* <Pagination.First />
      <Pagination.Prev /> */}
      {pageNumbers}
      {/* listaPropostas.pageable.pageNumber
              <Pagination.Item key={number} active={number === active}>{1}</Pagination.Item> */}
      {/* <Pagination.Ellipsis /> */}
      {/* <Pagination.Next />
      <Pagination.Last /> */}
    </Pagination>
  );
}
