import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectError } from "../selectors/selectors";

const ErrorWrapper = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  background-color: coral;
  font-size: 18px;
`;
export const Error = () => {
  const error = useSelector(selectError);

  return <ErrorWrapper>{error}</ErrorWrapper>;
};
