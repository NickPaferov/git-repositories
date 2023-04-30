import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";

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
  const isFetching = useSelector<AppRootStateType, boolean>((state) => state.repos.isFetching);

  const [pagesRangeNumber, setPagesRangeNumber] = useState(1);

  const pagesCount = Math.ceil(totalCount / pageSize);

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
    <div>
      <div>
        <button disabled={isFetching || pagesRangeNumber === 1} onClick={handleDecreasePagesRangeNumber}>
          &#11164;
        </button>
        <button disabled={isFetching || currentPage === 1} onClick={handleDecreaseCurrentPage}>
          &#60;
        </button>
        {pagesRangeNumber !== 1 && (
          <div>
            <button disabled={isFetching} onClick={handleSetFirstPageAsCurrent}>
              {1}
            </button>
            {currentPage !== 2 && <span>&#8230;</span>}
          </div>
        )}
        {currentPage < firstRangePageNumber && currentPage !== 1 && (
          <div>
            <button disabled={isFetching}>{currentPage}</button>
            <span>&#8230;</span>
          </div>
        )}
        {pages
          .filter((page) => page >= firstRangePageNumber && page <= lastRangePageNumber)
          .map((page, index) => (
            <button
              key={index}
              style={page === currentPage ? { backgroundColor: "cornflowerblue" } : undefined}
              disabled={isFetching}
              onClick={() => handleChangeCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        {currentPage > lastRangePageNumber && currentPage !== pagesCount && (
          <div>
            <span>&#8230;</span>
            <button disabled={isFetching}>{currentPage}</button>
          </div>
        )}
        {pagesRangeNumber !== pagesRangesCount && (
          <div>
            {currentPage !== pagesCount - 1 && <span>&#8230;</span>}
            <button disabled={isFetching} onClick={handleSetLastPageAsCurrent}>
              {pagesCount}
            </button>
          </div>
        )}
        <button disabled={isFetching || currentPage === pagesCount} onClick={handleIncreaseCurrentPage}>
          &#62;
        </button>
        <button disabled={isFetching || pagesRangeNumber === pagesRangesCount} onClick={handleIncreasePagesRangeNumber}>
          &#11166;
        </button>
      </div>
      <div>
        <span>Show </span>
        <select disabled={isFetching} value={pageSize} onChange={handleChangeItemsCountPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span> Repos per page</span>
      </div>
    </div>
  );
};
