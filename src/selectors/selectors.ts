import { AppRootStateType } from "../bll/store";
import { CurrentRepoType, RepoType } from "../api/repos-api";

export const selectFetchingStatus = (state: AppRootStateType): boolean => state.repos.isFetching;
export const selectRepos = (state: AppRootStateType): RepoType[] => state.repos.items;

export const selectSearchValue = (state: AppRootStateType): string => state.repos.searchValue;
export const selectTotalCount = (state: AppRootStateType): number => state.repos.totalCount;
export const selectPageSize = (state: AppRootStateType): number => state.repos.pageSize;
export const selectCurrentPage = (state: AppRootStateType): number => state.repos.currentPage;
export const selectCurrentRepo = (state: AppRootStateType): CurrentRepoType | null => state.repos.currentRepo;
export const selectError = (state: AppRootStateType): string | null => state.repos.error;
