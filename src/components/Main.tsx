import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { RepoType } from "../api/repos-api";
import { fetchRepos, setCurrentPageAC, setReposPerPageAC, setSearchValueAC } from "../bll/reposReducer";
import { useDebounce } from "../hooks/useDebounce";
import { PaginationBlock } from "../common/PaginationBlock";
import { Repo } from "./Repo";

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
      <span>Search: </span>
      <input
        type="search"
        placeholder="Input repository name"
        value={searchName}
        onChange={(e) => setSearchName(e.currentTarget.value)}
      />
      {isFetching ? <div>Loading...</div> : repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
      <PaginationBlock
        totalCount={totalCount}
        pagesRangeSize={10}
        currentPage={currentPage}
        pageSize={pageSize}
        onChangeCurrentPage={handleChangeCurrentPage}
        onChangePageSize={handleChangePageSize}
      />
    </div>
  );
};
