import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos, setCurrentPageAC, setReposPerPageAC, setSearchValueAC } from "../bll/reposReducer";
import { useDebounce } from "../hooks/useDebounce";
import { PaginationBlock } from "../common/PaginationBlock";
import { Repo } from "./Repo";
import { Error } from "../common/Error";
import styled from "styled-components";
import { Spinner } from "../common/Spinner";
import {
  selectCurrentPage,
  selectFetchingStatus,
  selectPageSize,
  selectRepos,
  selectSearchValue,
  selectTotalCount,
} from "../selectors/selectors";
import bgImg1 from "../assets/backGroundFirst.jpg";

const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url(${bgImg1});
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 50px 0 20px 0;
  color: lavender;
`;

const Input = styled.input`
  width: 25%;
  font-size: 16px;
  padding: 5px;
  border-radius: 5px;
  background-color: lavender;
`;

const RepoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoRepos = styled.span`
  color: dimgrey;
  font-size: 36px;
`;

export const Main = () => {
  const dispatch = useDispatch();

  const repos = useSelector(selectRepos);
  const isFetching = useSelector(selectFetchingStatus);
  const searchValue = useSelector(selectSearchValue);
  const totalCount = useSelector(selectTotalCount);
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);

  const [searchName, setSearchName] = useState("");

  const debouncedValue = useDebounce<string>(searchName, 1000);

  const handleChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPageAC(page));
  };

  const handleChangePageSize = (reposPerPage: number) => {
    dispatch(setReposPerPageAC(reposPerPage));
  };

  useEffect(() => {
    dispatch(setSearchValueAC(searchName));
  }, [dispatch, debouncedValue]);

  useEffect(() => {
    dispatch(fetchRepos(searchValue, currentPage, pageSize));
  }, [dispatch, searchValue, currentPage, pageSize]);

  return (
    <div>
      <Error />

      <MainWrapper>
        <SearchWrapper>
          <span>Search</span>
          <Input
            type="search"
            placeholder="Input repository name"
            value={searchName}
            disabled={isFetching}
            onChange={(e) => setSearchName(e.currentTarget.value)}
          />
        </SearchWrapper>
        <RepoListWrapper>
          {isFetching ? (
            <Spinner />
          ) : repos.length ? (
            repos.map((repo) => <Repo key={repo.id} repo={repo} />)
          ) : (
            <NoRepos>Repositories not found</NoRepos>
          )}
        </RepoListWrapper>
        <PaginationBlock
          totalCount={totalCount}
          pagesRangeSize={10}
          currentPage={currentPage}
          pageSize={pageSize}
          onChangeCurrentPage={handleChangeCurrentPage}
          onChangePageSize={handleChangePageSize}
        />
      </MainWrapper>
    </div>
  );
};
