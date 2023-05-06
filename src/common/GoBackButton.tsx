import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { setCurrentRepoAC } from "../bll/reposReducer";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  position: absolute;
  margin: 35px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const GoBackButton = () => {
  const navigate = useNavigate();

  const isFetching = useSelector<AppRootStateType, boolean>((state) => state.repos.isFetching);

  const handleMoveToRepos = () => {
    setCurrentRepoAC(null);
    navigate("/");
  };

  return (
    <Button disabled={isFetching} onClick={handleMoveToRepos}>
      🡨 Go back
    </Button>
  );
};
