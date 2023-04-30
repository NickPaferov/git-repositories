import { CurrentRepoType, reposApi, ReposResponseType, RepoType } from "../api/repos-api";
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

const initialState = {
  items: [] as RepoType[],
  isFetching: false,
  searchValue: "",
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  currentRepo: null as null | CurrentRepoType,
};

type InitialStateType = typeof initialState;

export const reposReducer = (state = initialState, action: ReposActionsType): InitialStateType => {
  switch (action.type) {
    case "REPOS/SET-REPOS":
      return { ...state, items: action.repos, totalCount: action.totalCount };
    case "REPOS/SET-IS-FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "REPOS/SET-SEARCH-VALUE":
      return { ...state, searchValue: action.searchValue };
    case "REPOS/SET-CURRENT-PAGE":
      return { ...state, currentPage: action.currentPage };
    case "REPOS/SET-PAGE-SIZE":
      return { ...state, pageSize: action.pageSize };
    case "REPOS/SET-CURRENT-REPO":
      return { ...state, currentRepo: action.currentRepo };
    default:
      return state;
  }
};

export const setReposAC = (repos: RepoType[], totalCount: number) =>
  ({ type: "REPOS/SET-REPOS", repos, totalCount } as const);
export const setIsFetchingAC = (isFetching: boolean) => ({ type: "REPOS/SET-IS-FETCHING", isFetching } as const);
export const setSearchValueAC = (searchValue: string) => ({ type: "REPOS/SET-SEARCH-VALUE", searchValue } as const);
export const setCurrentPageAC = (currentPage: number) => ({ type: "REPOS/SET-CURRENT-PAGE", currentPage } as const);
export const setReposPerPageAC = (pageSize: number) => ({ type: "REPOS/SET-PAGE-SIZE", pageSize } as const);
export const setCurrentRepoAC = (currentRepo: CurrentRepoType | null) =>
  ({ type: "REPOS/SET-CURRENT-REPO", currentRepo } as const);

export function* fetchReposWorkerSaga(action: ReturnType<typeof fetchRepos>) {
  yield put(setIsFetchingAC(true));
  try {
    const res: AxiosResponse<ReposResponseType> = yield call(
      reposApi.getRepos,
      action.searchValue,
      action.page,
      action.per_page
    );
    yield put(setReposAC(res.data.items, res.data.total_count));
  } catch (e) {
  } finally {
    yield put(setIsFetchingAC(false));
  }
}

export const fetchRepos = (searchValue: string, page: number, per_page: number) =>
  ({
    type: "REPOS/FETCH-REPOS",
    searchValue,
    page,
    per_page,
  } as const);

export function* fetchCurrentRepoWorkerSaga(action: ReturnType<typeof fetchCurrentRepo>) {
  yield put(setIsFetchingAC(true));
  try {
    const res: AxiosResponse<CurrentRepoType> = yield call(reposApi.getCurrentRepo, action.authorName, action.repoName);
    yield put(setCurrentRepoAC(res.data));
  } catch (e) {
  } finally {
    yield put(setIsFetchingAC(false));
  }
}

export const fetchCurrentRepo = (authorName: string, repoName: string) =>
  ({
    type: "REPOS/FETCH-CURRENT-REPO",
    authorName,
    repoName,
  } as const);

export function* reposWatcherSaga() {
  yield takeEvery("REPOS/FETCH-REPOS", fetchReposWorkerSaga);
  yield takeEvery("REPOS/FETCH-CURRENT-REPO", fetchCurrentRepoWorkerSaga);
}

type ReposActionsType =
  | ReturnType<typeof setReposAC>
  | ReturnType<typeof setIsFetchingAC>
  | ReturnType<typeof setSearchValueAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setReposPerPageAC>
  | ReturnType<typeof setCurrentRepoAC>;
