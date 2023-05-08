import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectFetchingStatus } from "../selectors/selectors";

const PaginationBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 50px 0;
  gap: 10px;
  font-size: 16px;
`;

const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 5px 0 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Selector = styled.select`
  font-size: 16px;
  cursor: pointer;
`;

type PaginationBlockPropsType = {
  totalCount: number;
  pagesRangeSize: number;
  currentPage: number;
  pageSize: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePageSize: (pageSize: number) => void;
};

export const PaginationBlock: FC<PaginationBlockPropsType> = ({
  totalCount,
  pagesRangeSize,
  currentPage,
  pageSize,
  onChangeCurrentPage,
  onChangePageSize,
}) => {
  const isFetching = useSelector(selectFetchingStatus);

  const [pagesRangeNumber, setPagesRangeNumber] = useState(1);

  // const pagesCount = Math.ceil(totalCount / pageSize);

  // server response: Only the first 1000 search results are available
  let searchResults;
  if (totalCount > 1000) {
    searchResults = 1000;
  } else {
    searchResults = totalCount;
  }
  const pagesCount = Math.ceil(searchResults / pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const pagesRangesCount = Math.ceil(pagesCount / pagesRangeSize);
  const firstRangePageNumber = (pagesRangeNumber - 1) * pagesRangeSize + 1;
  const lastRangePageNumber = pagesRangeNumber * pagesRangeSize;

  const handleChangeCurrentPage = (page: number) => {
    onChangeCurrentPage(page);
  };

  const handleChangeItemsCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangePageSize(+e.currentTarget.value);
    onChangeCurrentPage(1);
  };

  const handleDecreasePagesRangeNumber = () => {
    setPagesRangeNumber(pagesRangeNumber - 1);
  };

  const handleIncreasePagesRangeNumber = () => {
    setPagesRangeNumber(pagesRangeNumber + 1);
  };

  const handleDecreaseCurrentPage = () => {
    onChangeCurrentPage(currentPage - 1);
  };

  const handleIncreaseCurrentPage = () => {
    onChangeCurrentPage(currentPage + 1);
  };

  const handleSetFirstPageAsCurrent = () => {
    onChangeCurrentPage(1);
  };

  const handleSetLastPageAsCurrent = () => {
    onChangeCurrentPage(pagesCount);
  };

  useEffect(() => {
    setPagesRangeNumber(Math.ceil(currentPage / pagesRangeSize));
  }, [currentPage, pagesRangeSize]);

  return (
    <PaginationBlockWrapper>
      <Pages>
        <Button disabled={isFetching || pagesRangeNumber === 1} onClick={handleDecreasePagesRangeNumber}>
          &#11164;
        </Button>
        <Button disabled={isFetching || currentPage === 1} onClick={handleDecreaseCurrentPage}>
          &#60;
        </Button>
        {pagesRangeNumber !== 1 && (
          <div>
            <Button disabled={isFetching} onClick={handleSetFirstPageAsCurrent}>
              {1}
            </Button>
            {currentPage !== 2 && <span>&#8230;</span>}
          </div>
        )}
        {currentPage < firstRangePageNumber && currentPage !== 1 && (
          <div>
            <Button disabled={isFetching}>{currentPage}</Button>
            <span>&#8230;</span>
          </div>
        )}
        {pages
          .filter((page) => page >= firstRangePageNumber && page <= lastRangePageNumber)
          .map((page, index) => (
            <Button
              key={index}
              style={page === currentPage ? { backgroundColor: "cornflowerblue" } : undefined}
              disabled={isFetching}
              onClick={() => handleChangeCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        {currentPage > lastRangePageNumber && currentPage !== pagesCount && (
          <div>
            <span>&#8230;</span>
            <Button disabled={isFetching}>{currentPage}</Button>
          </div>
        )}
        {pagesRangeNumber !== pagesRangesCount && (
          <div>
            {currentPage !== pagesCount - 1 && <span>&#8230;</span>}
            <Button disabled={isFetching} onClick={handleSetLastPageAsCurrent}>
              {pagesCount}
            </Button>
          </div>
        )}
        <Button disabled={isFetching || currentPage === pagesCount} onClick={handleIncreaseCurrentPage}>
          &#62;
        </Button>
        <Button disabled={isFetching || pagesRangeNumber === pagesRangesCount} onClick={handleIncreasePagesRangeNumber}>
          &#11166;
        </Button>
      </Pages>
      <div>
        <span>Show </span>
        <Selector disabled={isFetching} value={pageSize} onChange={handleChangeItemsCountPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Selector>
        <span> repositories per page</span>
      </div>
    </PaginationBlockWrapper>
  );
};
