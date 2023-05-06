import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../bll/store";
import { CurrentRepoType } from "../api/repos-api";
import { fetchCurrentRepo, setCurrentRepoAC } from "../bll/reposReducer";
import { Error } from "../common/Error";
import styled from "styled-components";
import { Spinner } from "../common/Spinner";

const CardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 0 20px;
`;

const Button = styled.button`
  position: absolute;
  margin: 35px;
  padding: 10px;
  font-size: 16px;
`;

const CardInfo = styled.div`
  border: 1px solid dimgrey;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  gap: 20px;
`;

const Ava = styled.img`
  height: 300px;
  width: 300px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 10px;
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
      <Button disabled={isFetching} onClick={handleMoveToRepos}>
        🡨 Go back
      </Button>
      <CardWrapper>
        <div>
          {isFetching ? (
            <Spinner />
          ) : currentRepo ? (
            <CardInfo>
              <Ava src={currentRepo.owner.avatar_url} alt="avatar" />
              <div>
                <span>Link: </span>
                <b>
                  <a href={currentRepo.html_url}>{currentRepo?.html_url}</a>
                </b>
              </div>
              <TextWrapper>
                <span>Repository name:</span>
                <b>{currentRepo.name}</b>
              </TextWrapper>
              <TextWrapper>
                <span>Description:</span>
                <b>{currentRepo.description}</b>
              </TextWrapper>
              <TextWrapper>
                <span>Stars count:</span>
                <b>{currentRepo.stargazers_count}</b>
              </TextWrapper>
            </CardInfo>
          ) : (
            <div>Repository not found</div>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
