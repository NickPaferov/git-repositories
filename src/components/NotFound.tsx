import React from "react";
import styled from "styled-components";
import { GoBackButton } from "../common/GoBackButton";

const NotFoundWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  color: dimgrey;
  font-size: 36px;
`;

export const NotFound = () => {
  return (
    <div>
      <GoBackButton />
      <NotFoundWrapper>
        <Text>404 Page not found</Text>
      </NotFoundWrapper>
    </div>
  );
};
