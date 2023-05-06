import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Card } from "./Card";
import { NotFound } from "./NotFound";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/card/:authorName/:repoName" element={<Card />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
