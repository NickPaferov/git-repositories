import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";

export const Error = () => {
  const error = useSelector<AppRootStateType, string | null>((state) => state.repos.error);

  return <div style={{ width: "100%", textAlign: "center", backgroundColor: "coral" }}>{error}</div>;
};
