import { Action } from '@ngrx/store';
import { Transaction } from '../../../host/assets/model/transaction.schema';

export enum ActionTypes {
  GetAccountsSuccess = '[Berith] Get Accounts Success',
  SetBerithBaseSuccess = '[Berith] SetBerith Base Success',
  GetCoinbaseSuccess = '[Berith] Get Coinbase Success',
  CreateAccountSuccess = '[Berith] Create Account Success',
  IsLockedSuccess = '[Berith] Is Locked Success',
  UnlockAccountSuccess = '[Berith] Unlock Account Success',
  LockAccountSuccess = '[Berith] Lock Account Success',
  GetBlockSuccess = '[Berith] Get Block Success',
  GetBalanceSuccess = '[Berith] Get Balance Success',
  GetStakeBalanceSuccess = '[Berith] Get Stake Balance Success',
  GetRewardBalanceSuccess = '[Berith] Get Reward Balance Success',
  SendTransactionSuccess = '[Berith] Send Transaction Success',
  StakeTransactionSuccess = '[Berith] Stake Transaction Success',
  SendRewardToBalanceSuccess = '[Berith] Send Reward To Balance Success',
  SendRewardToStakeSuccess = '[Berith] Send Reward To Stake Success',
  StopStakeSuccess = '[Berith] Stop Stake Success',
  GetTransactionsSuccess = '[Berith] Get Transactions Success',
  GetMainTransactionsSuccess = '[Berith] Get Main Transactions Success',
  GetRewardTransactionsSuccess = '[Berith] Get Reward Transactions Success',
  GetMainToMainTransactionsSuccess = '[Berith] Get Main To Main Transactions Success',
  GetMainToStakeTransactionsSuccess = '[Berith] Get Main To Stake Transactions Success',
  GetRewardToMainTransactionsSuccess = '[Berith] Get Reward To Main Transactions Success',
  GetRewardToStakeTransactionsSuccess = '[Berith] Get Reward To Stake Transactions Success',
  GetStakeToMainTransactionsSuccess = '[Berith] Get Stake To Main Transactions Success',
  MiningStartSuccess = '[Berith] mining start Success',
  BerithOutSuccess = '[Berith] Berith Out Success',
  PeersOutSuccess = '[Berith] Peers Out Success',
  SyncingOutSuccess = '[Berith] Syncing Out Success',
  GetTxPoolSuccess = '[Berith] txpool Success',
  GetPendingSuccess = '[Berith] pending Success',
  NewTransactionOutSuccess = '[Berith] New Transaction Out Success'
  
}

export class GetAccountsSuccess implements Action {
  readonly type = ActionTypes.GetAccountsSuccess;
  constructor(public payload: string[]) {}
}

export class GetTxPoolSuccess implements Action {
  readonly type = ActionTypes.GetTxPoolSuccess;
  constructor(public payload: string[]) {}
}
export class GetPendingSuccess implements Action {
  readonly type = ActionTypes.GetPendingSuccess;
  constructor(public payload: string[]) {}
}

export class MiningStartSuccess implements Action {
  readonly type = ActionTypes.MiningStartSuccess;
  constructor(public payload: string[]) {}
}
export class StopStakeSuccess implements Action {
  readonly type = ActionTypes.StopStakeSuccess;
  constructor(public payload: string) {}
}
export class SetBerithBaseSuccess implements Action {
  readonly type = ActionTypes.SetBerithBaseSuccess;
  constructor(public payload: string) {}
}

export class GetCoinbaseSuccess implements Action {
  readonly type = ActionTypes.GetCoinbaseSuccess;
  constructor(public payload: string) {}
}

export class CreateAccountSuccess implements Action {
  readonly type = ActionTypes.CreateAccountSuccess;
}

export class IsLockedSuccess implements Action {
  readonly type = ActionTypes.IsLockedSuccess;
  constructor(public payload: boolean) {}
}

export class UnlockAccountSuccess implements Action {
  readonly type = ActionTypes.UnlockAccountSuccess;
}

export class LockAccountSuccess implements Action {
  readonly type = ActionTypes.LockAccountSuccess;
}

export class GetBlockSuccess implements Action {
  readonly type = ActionTypes.GetBlockSuccess;
  constructor(public payload: string) {}
}

export class GetBalanceSuccess implements Action {
  readonly type = ActionTypes.GetBalanceSuccess;
  constructor(public payload: string) {}
}

export class GetStakeBalanceSuccess implements Action {
  readonly type = ActionTypes.GetStakeBalanceSuccess;
  constructor(public payload: string) {}
}

export class GetRewardBalanceSuccess implements Action {
  readonly type = ActionTypes.GetRewardBalanceSuccess;
  constructor(public payload: string) {}
}

export class SendTransactionSuccess implements Action {
  readonly type = ActionTypes.SendTransactionSuccess;
}

export class StakeTransactionSuccess implements Action {
  readonly type = ActionTypes.StakeTransactionSuccess;
}

export class SendRewardToBalanceSuccess implements Action {
  readonly type = ActionTypes.SendRewardToBalanceSuccess;
}

export class SendRewardToStakeSuccess implements Action {
  readonly type = ActionTypes.SendRewardToStakeSuccess;
}

export class GetTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetMainTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetMainTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetRewardTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetRewardTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetMainToMainTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetMainToMainTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetMainToStakeTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetMainToStakeTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetRewardToMainTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetRewardToMainTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetRewardToStakeTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetRewardToStakeTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class GetStakeToMainTransactionsSuccess implements Action {
  readonly type = ActionTypes.GetStakeToMainTransactionsSuccess;
  constructor(public payload: Transaction[]) {}
}

export class BerithOutSuccess implements Action {
  readonly type = ActionTypes.BerithOutSuccess;
  constructor(public payload: string) {}
}

export class PeersOutSuccess implements Action {
  readonly type = ActionTypes.PeersOutSuccess;
  constructor(public payload: number) {}
}

export class SyncingOutSuccess implements Action {
  readonly type = ActionTypes.SyncingOutSuccess;
  constructor(public payload: number) {}
}

export class NewTransactionOutSuccess implements Action {
  readonly type = ActionTypes.NewTransactionOutSuccess;
  constructor(public payload: number) {}
}

export type ActionsUnion = GetAccountsSuccess | SetBerithBaseSuccess | GetCoinbaseSuccess | 
    CreateAccountSuccess | IsLockedSuccess | LockAccountSuccess | UnlockAccountSuccess | GetBlockSuccess |
    GetBalanceSuccess | GetStakeBalanceSuccess | GetRewardBalanceSuccess |
    SendRewardToBalanceSuccess | StakeTransactionSuccess |
    SendTransactionSuccess | SendRewardToStakeSuccess |
    GetTransactionsSuccess | GetMainTransactionsSuccess | GetRewardTransactionsSuccess | 
    GetMainToMainTransactionsSuccess | GetMainToStakeTransactionsSuccess | GetRewardToMainTransactionsSuccess | GetRewardToStakeTransactionsSuccess | GetStakeToMainTransactionsSuccess |
    BerithOutSuccess | PeersOutSuccess | SyncingOutSuccess | NewTransactionOutSuccess | GetTxPoolSuccess | GetPendingSuccess;