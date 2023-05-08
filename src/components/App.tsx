import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Card } from "./Card";
import { NotFound } from "./NotFound";
import { PATHS } from "../enums/paths";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATHS.INDEX} element={<Main />} />
        <Route path={PATHS.CARD} element={<Card />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
};
