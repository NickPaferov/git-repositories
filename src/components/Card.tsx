import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentRepo } from "../bll/reposReducer";
import { Error } from "../common/Error";
import styled from "styled-components";
import { Spinner } from "../common/Spinner";
import { GoBackButton } from "../common/GoBackButton";
import { selectCurrentRepo, selectFetchingStatus } from "../selectors/selectors";
import bgImg1 from "../assets/backGroundFirst.jpg";
import bgImg2 from "../assets/backGroundSecond.jpg";

const CardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 0 20px;
  background: url(${bgImg1});
`;

const CardInfo = styled.div`
  border: 1px solid dimgrey;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  gap: 20px;
  background: url(${bgImg2}) no-repeat center;
  background-size: cover;
  border-radius: 10px;
`;

const Ava = styled.img`
  height: 300px;
  width: 300px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const NoRepo = styled.span`
  color: dimgrey;
  font-size: 36px;
`;

export const Card = () => {
  const dispatch = useDispatch();

  const isFetching = useSelector(selectFetchingStatus);
  const currentRepo = useSelector(selectCurrentRepo);

  const { authorName, repoName } = useParams();

  useEffect(() => {
    if (!authorName || !repoName) return;
    dispatch(fetchCurrentRepo(authorName, repoName));
  }, [dispatch, authorName, repoName]);

  return (
    <div>
      <Error />
      <GoBackButton />
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
            <NoRepo>Repository not found</NoRepo>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
