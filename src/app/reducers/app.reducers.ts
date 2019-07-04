import * as BerithActions from '../actions/berith.actions';
import { initialAppState, AppState } from '../store';

export function appReducer(
  state = initialAppState,
  action: BerithActions.ActionsUnion
): AppState {
  switch (action.type) {
    case BerithActions.ActionTypes.GetAccountsSuccess: {
      return {
        ...state,
        accounts: action.payload
      };
    }

    case BerithActions.ActionTypes.GetTxPoolSuccess: {
      return {
        ...state,
        txpool: action.payload
      };
    }

    case BerithActions.ActionTypes.GetPendingSuccess: {
      return {
        ...state,
        txpool: action.payload
      };
    }

    case BerithActions.ActionTypes.SetBerithBaseSuccess: {
      return {
        ...state,
        account: action.payload
      };
    }

    case BerithActions.ActionTypes.GetCoinbaseSuccess: {
      return {
        ...state,
        account: action.payload
      };
    }

    case BerithActions.ActionTypes.CreateAccountSuccess: {
      return {
        ...state
      };
    }

    case BerithActions.ActionTypes.IsLockedSuccess: {
      return {
        ...state,
        locked : action.payload
      };
    }

    case BerithActions.ActionTypes.UnlockAccountSuccess: {
      return {
        ...state,
        locked : false
      };
    }

    case BerithActions.ActionTypes.LockAccountSuccess: {
      return {
        ...state,
        locked : true
      };
    }

    case BerithActions.ActionTypes.GetBlockSuccess: {
      return {
        ...state,
        block : action.payload
      };
    }

    case BerithActions.ActionTypes.GetBalanceSuccess: {
      return {
        ...state,
        balance : action.payload
      };
    }

    case BerithActions.ActionTypes.GetStakeBalanceSuccess: {
      return {
        ...state,
        stakeBalance : action.payload
      };
    }

    case BerithActions.ActionTypes.GetRewardBalanceSuccess: {
      return {
        ...state,
        rewardBalance : action.payload
      };
    }

    case BerithActions.ActionTypes.SendTransactionSuccess: {
      return {
        ...state
      };
    }

    case BerithActions.ActionTypes.StakeTransactionSuccess: {
      return {
        ...state
      };
    }

    case BerithActions.ActionTypes.SendRewardToBalanceSuccess: {
      return {
        ...state
      };
    }

    case BerithActions.ActionTypes.SendRewardToStakeSuccess: {
      return {
        ...state
      };
    }
    
    case BerithActions.ActionTypes.GetTransactionsSuccess: {
      return {
        ...state,
        transactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetMainTransactionsSuccess: {
      return {
        ...state,
        mainTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetRewardTransactionsSuccess: {
      return {
        ...state,
        rewardTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetMainToMainTransactionsSuccess: {
      return {
        ...state,
        mainToMainTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetMainToStakeTransactionsSuccess: {
      return {
        ...state,
        mainToStakeTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetRewardToMainTransactionsSuccess: {
      return {
        ...state,
        rewardToMainTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetRewardToStakeTransactionsSuccess: {
      return {
        ...state,
        rewardToStakeTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.GetStakeToMainTransactionsSuccess: {
      return {
        ...state,
        stakeToMainTransactions: action.payload
      };
    }

    case BerithActions.ActionTypes.BerithOutSuccess: {
      return {
        ...state,
        berithOut: action.payload
      };
    }

    case BerithActions.ActionTypes.PeersOutSuccess: {
      return {
        ...state,
        peersOut: action.payload
      };
    }

    case BerithActions.ActionTypes.SyncingOutSuccess: {
      return {
        ...state,
        syncingOut: action.payload
      };
    }

    case BerithActions.ActionTypes.NewTransactionOutSuccess: {
      return {
        ...state,
        newTransactionOut: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

 