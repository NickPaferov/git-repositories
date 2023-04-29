import React, { FC } from "react";
import { RepoType } from "../api/repos-api";

type RepoPropsType = {
  repo: RepoType;
};

export const Repo: FC<RepoPropsType> = ({ repo }) => {
  return (
    <div>
      <span>{repo.name}</span> - <a href={repo.html_url}>{repo.html_url}</a>
    </div>
  );
};
