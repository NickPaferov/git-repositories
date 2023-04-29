import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { RepoType } from "../api/repos-api";
import { fetchRepos } from "../bll/reposReducer";
import { Repo } from "./Repo";
import { useDebounce } from "../hooks/useDebounce";

export const Main = () => {
  const dispatch = useDispatch();

  const repos = useSelector<AppRootStateType, RepoType[]>((state) => state.repos.items);
  const isFetching = useSelector<AppRootStateType, boolean>((state) => state.repos.isFetching);

  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue, 1000);

  useEffect(() => {
    dispatch(fetchRepos(searchValue));
  }, [dispatch, debouncedValue]);

  return (
    <div>
      <span>Search: </span>
      <input
        type="search"
        placeholder="Input repository name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      {isFetching ? <div>Loading...</div> : repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
    </div>
  );
};
