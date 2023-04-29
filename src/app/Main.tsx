import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { RepoType } from "../api/repos-api";
import { fetchRepos } from "../bll/reposReducer";
import { Repo } from "./Repo";

export const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector<AppRootStateType, RepoType[]>((state) => state.repos.items);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  return (
    <div>
      {repos.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </div>
  );
};
