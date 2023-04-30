import React, { FC } from "react";
import { RepoType } from "../api/repos-api";
import { NavLink } from "react-router-dom";

type RepoPropsType = {
  repo: RepoType;
};

export const Repo: FC<RepoPropsType> = ({ repo }) => {
  return (
    <div>
      <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink> -{" "}
      <a href={repo.html_url}>{repo.html_url}</a>
    </div>
  );
};
