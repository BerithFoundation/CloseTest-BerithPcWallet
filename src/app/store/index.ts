import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Transaction } from "../../../host/assets/model/transaction.schema";

export interface AppState {
  account: string;
  locked: boolean;
  block: string;
  balance: string;
  stakeBalance: string;
  rewardBalance: string;
  accounts: string[];
  txpool: string[];
  pending : string[];
  transactions: Transaction[];
  mainTransactions: Transaction[];
  rewardTransactions: Transaction[];
  mainToMainTransactions: Transaction[];
  mainToStakeTransactions: Transaction[];
  rewardToMainTransactions: Transaction[];
  rewardToStakeTransactions: Transaction[];
  stakeToMainTransactions: Transaction[];
  berithOut: string;
  peersOut: number;
  syncingOut: number;
  newTransactionOut: number;
}

export const initialAppState: AppState = {
  account: '',
  locked: false,
  block: '',
  balance: '',
  stakeBalance: '',
  rewardBalance: '',
  accounts: [],
  txpool : [] , 
  pending  : [] , 
  transactions: [],
  mainTransactions: [],
  rewardTransactions: [],
  mainToMainTransactions: [],
  mainToStakeTransactions: [],
  rewardToMainTransactions: [],
  rewardToStakeTransactions: [],
  stakeToMainTransactions: [],
  berithOut: '',
  peersOut: 0,
  syncingOut: 0,
  newTransactionOut: 0
}

export const selectAppState = createFeatureSelector<AppState>('rootState');

export const selectAccounts = createSelector(
  selectAppState,
  (state: AppState) => state.accounts
);
export const selectTxpool = createSelector(
  selectAppState,
  (state: AppState) => state.txpool
);

export const selectPeding = createSelector(
  selectAppState,
  (state: AppState) => state.pending
);

export const selectAccount = createSelector(
  selectAppState,
  (state: AppState) => state.account
);

export const selectIsLocked = createSelector(
  selectAppState,
  (state: AppState) => state.locked
);

export const selectBlock = createSelector(
  selectAppState,
  (state: AppState) => state.block
);

export const selectBalance = createSelector(
  selectAppState,
  (state: AppState) => state.balance
);

export const selectStakeBalance = createSelector(
  selectAppState,
  (state: AppState) => state.stakeBalance
);

export const selectRewardBalance = createSelector(
  selectAppState,
  (state: AppState) => state.rewardBalance
);

export const selectTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.transactions
);

export const selectMainTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.mainTransactions
);

export const selectRewardTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.rewardTransactions
);

export const selectMainToMainTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.mainToMainTransactions
);

export const selectMainToStakeTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.mainToStakeTransactions
);

export const selectRewardToMainTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.rewardToMainTransactions
);

export const selectRewardToStakeTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.rewardToStakeTransactions
);

export const selectStakeToMainTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.stakeToMainTransactions
);

export const selectBerithOut = createSelector(
  selectAppState,
  (state: AppState) => state.berithOut
);

export const selectPeersOut = createSelector(
  selectAppState,
  (state: AppState) => state.peersOut
);

export const selectSyncingOut = createSelector(
  selectAppState,
  (state: AppState) => state.syncingOut
);

export const selectNewTransactionOut = createSelector(
  selectAppState,
  (state: AppState) => state.newTransactionOut
);
