import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { RepoType } from "../api/repos-api";
import { fetchRepos, setCurrentPageAC, setReposPerPageAC, setSearchValueAC } from "../bll/reposReducer";
import { useDebounce } from "../hooks/useDebounce";
import { PaginationBlock } from "../common/PaginationBlock";
import { Repo } from "./Repo";
import { Error } from "../common/Error";
import styled from "styled-components";

const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px;
`;

const Input = styled.input`
  width: 25%;
  font-size: 16px;
  padding: 5px;
`;

const RepoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Main = () => {
  const dispatch = useDispatch();

  const repos = useSelector<AppRootStateType, RepoType[]>((state) => state.repos.items);
  const isFetching = useSelector<AppRootStateType, boolean>((state) => state.repos.isFetching);
  const searchValue = useSelector<AppRootStateType, string>((state) => state.repos.searchValue);
  const totalCount = useSelector<AppRootStateType, number>((state) => state.repos.totalCount);
  const pageSize = useSelector<AppRootStateType, number>((state) => state.repos.pageSize);
  const currentPage = useSelector<AppRootStateType, number>((state) => state.repos.currentPage);

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
            onChange={(e) => setSearchName(e.currentTarget.value)}
          />
        </SearchWrapper>
        <RepoListWrapper>
          {isFetching ? <div>Loading...</div> : repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
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
