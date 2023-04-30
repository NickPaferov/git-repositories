import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Card } from "./Card";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/card/:authorName/:repoName" element={<Card />} />
      </Routes>
    </div>
  );
};
