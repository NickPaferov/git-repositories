import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppRootStateType } from "../bll/store";

const ErrorWrapper = styled.div`
  width: 100%;
  text-align: center;
  background-color: coral;
  font-size: 18px;
`;
export const Error = () => {
  const error = useSelector<AppRootStateType, string | null>((state) => state.repos.error);

  return <ErrorWrapper>{error}</ErrorWrapper>;
};
