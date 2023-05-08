import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setCurrentRepoAC } from "../bll/reposReducer";
import { useNavigate } from "react-router-dom";
import { selectFetchingStatus } from "../selectors/selectors";
import { PATHS } from "../enums/paths";

const Button = styled.button`
  position: absolute;
  margin: 35px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const GoBackButton = () => {
  const navigate = useNavigate();

  const isFetching = useSelector(selectFetchingStatus);

  const handleMoveToRepos = () => {
    setCurrentRepoAC(null);
    navigate(PATHS.INDEX);
  };

  return (
    <Button disabled={isFetching} onClick={handleMoveToRepos}>
      🡨 Go back
    </Button>
  );
};
