import React, { FC } from "react";
import { RepoType } from "../api/repos-api";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const RepoWrapper = styled.div`
  min-width: 35%;
  display: flex;
  justify-content: space-between;
  border: 1px solid dimgrey;
  margin: 10px;
  padding: 20px;
  gap: 20px;
  font-size: 18px;
  background-color: lavender;
`;

type RepoPropsType = {
  repo: RepoType;
};

export const Repo: FC<RepoPropsType> = ({ repo }) => {
  return (
    <RepoWrapper>
      <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink>
      <span>Stars: {repo.stargazers_count}</span>
    </RepoWrapper>
  );
};
