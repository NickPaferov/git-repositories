import { reposApi, ReposResponseType, RepoType } from "../api/repos-api";
import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

const initialState = {
  items: [] as RepoType[],
  isFetching: false,
};

type InitialStateType = typeof initialState;

export const reposReducer = (state = initialState, action: ReposActionsType): InitialStateType => {
  switch (action.type) {
    case "REPOS/SET-REPOS":
      return { ...state, items: action.repos };
    case "REPOS/SET-IS-FETCHING":
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

export const setReposAC = (repos: RepoType[]) => ({ type: "REPOS/SET-REPOS", repos } as const);
export const setIsFetchingAC = (isFetching: boolean) => ({ type: "REPOS/SET-IS-FETCHING", isFetching } as const);

export function* fetchReposWorkerSaga(action: ReturnType<typeof fetchRepos>) {
  yield put(setIsFetchingAC(true));
  try {
    const res: AxiosResponse<ReposResponseType> = yield call(reposApi.getRepos, action.searchValue);
    yield put(setReposAC(res.data.items));
  } catch (e) {
  } finally {
    yield put(setIsFetchingAC(false));
  }
}

export const fetchRepos = (searchValue: string) => ({ type: "REPOS/FETCH-REPOS", searchValue } as const);

export function* reposWatcherSaga() {
  yield takeEvery("REPOS/FETCH-REPOS", fetchReposWorkerSaga);
}

type ReposActionsType = ReturnType<typeof setReposAC> | ReturnType<typeof setIsFetchingAC>;
