import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { CurrentRepoType } from "../api/repos-api";
import { fetchCurrentRepo, setCurrentRepoAC } from "../bll/reposReducer";
import { Error } from "../common/Error";
import styled from "styled-components";

const CardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 0 20px;
`;

const Button = styled.button`
  margin-bottom: 50px;
  padding: 10px;
  font-size: 16px;
`;

const CardInfo = styled.div`
  border: 1px solid dimgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 20px;
`;

const Ava = styled.img`
  height: 300px;
  width: 300px;
`;

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
      <Error />
      <CardWrapper>
        <Button onClick={handleMoveToRepos}>🡨 Go back</Button>
        <div>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <CardInfo>
              <Ava src={currentRepo?.owner.avatar_url} alt="avatar" />
              <div>
                <span>Link: </span>
                <b>
                  <a href={currentRepo?.html_url}>{currentRepo?.html_url}</a>
                </b>
              </div>
              <div>
                <span>Repository name: </span>
                <b>{currentRepo?.name}</b>
              </div>
              <div>
                <span>Description: </span>
                <b>{currentRepo?.description}</b>
              </div>
              <div>
                <span>Stars count: </span>
                <b>{currentRepo?.stargazers_count}</b>
              </div>
            </CardInfo>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
