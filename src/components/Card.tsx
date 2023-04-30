import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { CurrentRepoType } from "../api/repos-api";
import { fetchCurrentRepo, setCurrentRepoAC } from "../bll/reposReducer";

export const Card = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFetching = useSelector<AppRootStateType, boolean>((state) => state.repos.isFetching);
  const currentRepo = useSelector<AppRootStateType, CurrentRepoType | null>((state) => state.repos.currentRepo);

  const { authorName, repoName } = useParams();

  useEffect(() => {
    if (!authorName || !repoName) return;
    dispatch(fetchCurrentRepo(authorName, repoName));
  }, [dispatch, authorName, repoName]);

  const handleMoveToRepos = () => {
    setCurrentRepoAC(null);
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleMoveToRepos}>🡨 Go back</button>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <img src={currentRepo?.owner.avatar_url} alt="avatar" />
          <div>{currentRepo?.name}</div>
          <div>Stars count: {currentRepo?.stargazers_count}</div>
        </div>
      )}
    </div>
  );
};
