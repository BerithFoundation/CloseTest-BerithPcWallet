import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { ElectronService } from "../providers/electron.service";
import { Store } from "@ngrx/store";
import  { dialog } from 'electron'
import { AppState, selectAccount, selectNewTransactionOut } from "../store";
import { SetBerithBaseSuccess, GetAccountsSuccess,StopStakeSuccess, GetCoinbaseSuccess, CreateAccountSuccess, UnlockAccountSuccess, GetBlockSuccess, GetBalanceSuccess, GetStakeBalanceSuccess, GetRewardBalanceSuccess, SendRewardToBalanceSuccess, SendRewardToStakeSuccess, LockAccountSuccess, IsLockedSuccess, SendTransactionSuccess, StakeTransactionSuccess, GetMainToMainTransactionsSuccess, GetMainToStakeTransactionsSuccess, GetRewardToMainTransactionsSuccess, GetRewardToStakeTransactionsSuccess, GetStakeToMainTransactionsSuccess, GetTransactionsSuccess, GetMainTransactionsSuccess, GetRewardTransactionsSuccess,MiningStartSuccess, BerithOutSuccess, PeersOutSuccess, SyncingOutSuccess, NewTransactionOutSuccess, GetTxPoolSuccess, GetPendingSuccess } from "../actions/berith.actions";
import { Transaction } from "../../../host/assets/model/transaction.schema";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { bypassSanitizationTrustResourceUrl } from "@angular/core/src/sanitization/bypass";
import * as bigInt from 'big-integer'
import * as hexToDec from 'hex-to-dec'


@Injectable({
  providedIn: 'root'
})
export class BerithService {
  
  private unsubscribe: Subject<void> = new Subject();
  account : string;
  newTransactionOut: number;

  constructor (private es: ElectronService, private store: Store<AppState>) {
    this.store.select(selectAccount).subscribe( account => {
      this.account = account;
    });
    this.store.select(selectNewTransactionOut).subscribe( newTransactionOut => {
      this.newTransactionOut = newTransactionOut;
    });

    this.es.ipcRenderer.on('berithOut', (event, arg) => {
      this.store.dispatch(new BerithOutSuccess(arg));
    });

    this.es.ipcRenderer.on('peersOut', (event, arg) => {
      this.store.dispatch(new PeersOutSuccess(arg));
    });

    this.es.ipcRenderer.on('syncingOut', (event, arg) => {
      this.store.dispatch(new SyncingOutSuccess(arg));
    });

    this.es.ipcRenderer.on('newTransactionOut', (event, arg) => {
      this.store.dispatch(new NewTransactionOutSuccess(this.newTransactionOut + arg));
    });
    
    this.es.ipcRenderer.on('pending', (event, arg) => {
      this.getPendingTransaction()
    });
  }

  checkAccount(account?: string): boolean {
    return this.account != null && this.account.length > 0;
  }

  getAccounts(): boolean {
    let message = this.es.ipcRenderer.sendSync('accounts');
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetAccountsSuccess(data));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }
  
  getTxpool(): boolean {
    let message = this.es.ipcRenderer.sendSync('txpool');
    let data = message.recv.result.pending;
    
    if (data) {
      this.store.dispatch(new GetTxPoolSuccess(data));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }
  getPendingTransaction(): boolean {
    let message = this.es.ipcRenderer.sendSync('getPendingTransaction');
    let data = message.recv.result
    // let data = []
    // if( message.recv.result != null && message.recv.result != ""){
    //   message.recv.result.forEach( (v) => {
    //     data.push(v.hash)
    //   });
    // }else{
    //   data = message.recv.result.pending;
    // }
    if (data) {
      this.store.dispatch(new GetPendingSuccess(data));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  miningStart() : boolean{
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('miningStart');
    let data = message.recv.result;
    // if (data) {
    //   this.store.dispatch(new MiningStartSuccess(data));
    // } else {
    //   this.resolveError(message.recv.error);
    // }
    return true;
  }
  miningStop() : boolean{
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('miningStop');
    let data = message.recv.result;
    // if (data) {
    //   this.store.dispatch(new MiningStartSuccess(data));
    // } else {
    //   this.resolveError(message.recv.error);
    // }
    return true;
  }

  stopStaking(account : string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('stopStaking', account);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new StopStakeSuccess(account));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  setBerithbase(account: string): boolean {
    let message = this.es.ipcRenderer.sendSync('setBerithbase', account);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new SetBerithBaseSuccess(account));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getCoinbase(): boolean {
    let message = this.es.ipcRenderer.sendSync('coinbase', 'send');
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetCoinbaseSuccess(data));
    } else {
      this.store.dispatch(new GetCoinbaseSuccess(null));
      let error = message.recv.error;
      if (error && error.code) {
        // 생성된 계정이 없을 때
        return false;
      } else {
        this.resolveError(message.recv.error);
      }
    }
    return true;
  }

  createAccount(password: string): boolean {
    let message = this.es.ipcRenderer.sendSync('newAccount', password);
    let data = message.recv.result;
    if (data) { // "result":"0x869569c753d8f87bb985c172594b7a63e6a94287"}
      this.store.dispatch(new CreateAccountSuccess());

      this.setBerithbase(data);
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  isLocked(account: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('listWallets', account);
    let data = message.recv.result;
    if (data) {
      let locked: boolean = true;
      for (let obj of data) {
        if (obj['accounts'][0]['address'] == account) {
          locked = obj['status'] == "Locked";
          this.store.dispatch(new IsLockedSuccess(locked));
          break;
        }
      }
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  lockAccount(account: string, password): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    var args = { add : account, pass : password };
    let message = this.es.ipcRenderer.sendSync('lockAccount', args);
    let data = message.recv.result; // "result":true
    if (data && data === true) {
      this.store.dispatch(new LockAccountSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  unlockAccount(account: string, password): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    var args = { add : account, pass : password };
    let message = this.es.ipcRenderer.sendSync('unlockAccount', args);
    let data = message.recv.result; // "result":true
    if (data && data === true) {
      this.store.dispatch(new UnlockAccountSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getBlock(): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('getBlock', 'send');
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetBlockSuccess(data));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getBalance(account: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('getBalance', account);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetBalanceSuccess(this.HexToValueString(data)));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getStakeBalance(account: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('stakeBalance', account);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetStakeBalanceSuccess(this.HexToValueString(data)));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getRewardBalance(account: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let message = this.es.ipcRenderer.sendSync('rewardBalance', account);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new GetRewardBalanceSuccess(this.HexToValueString(data)));
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  sendTransaction(account: string, sendAddress: string, amount: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    var args = {
      from : account,
      to   : sendAddress,
      value : amount 
    }
    let message = this.es.ipcRenderer.sendSync('sendTransaction', args);
    let data = message.recv.result; // "result":"0x642acb9caa8b315b91d2ea10fb875435ef25edb897169c576882a32f7d14313a"
    if (data) {
      this.store.dispatch(new SendTransactionSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }
  sendTransaction2(account: string, gas : string , Pnonce : string ): boolean {
    if (!this.checkAccount()) {
      return false;
    }
    var args = {
      from : account,
      gasPrice : gas,
      nonce : Pnonce
    }
    let message = this.es.ipcRenderer.sendSync('sendTransaction2', args);
    let data = message.recv.result; 
    if (data) {
      this.store.dispatch(new SendTransactionSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  stakeTransaction(account: string, amount: string ): boolean {
    if (!this.checkAccount()) {
      return false;
    }
    
    var args = {
      from : account,
      value : amount
    }
    let message = this.es.ipcRenderer.sendSync('stakeTransaction', args);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new StakeTransactionSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  sendRewardToBalance(account: string, amount: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    var args = {
      from : account,
      value : amount
    }
    let message = this.es.ipcRenderer.sendSync('rewardToBalance', args);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new SendRewardToBalanceSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  sendRewardToStake(account: string, amount: string): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    var args = {
      from : account,
      value : amount
    }
    let message = this.es.ipcRenderer.sendSync('rewardToStake', args);
    let data = message.recv.result;
    if (data) {
      this.store.dispatch(new SendRewardToStakeSuccess());
    } else {
      this.resolveError(message.recv.error);
    }
    return true;
  }

  getTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('transactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getMainTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('mainTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetMainTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getRewardTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('rewardTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetRewardTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getMainToMainTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('mainToMainTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetMainToMainTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getMainToStakeTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('mainToStakeTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetMainToStakeTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getRewardToMainTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('rewardToMainTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetRewardToMainTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getRewardToStakeTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }

    let data: Transaction[] = this.es.ipcRenderer.sendSync('rewardToStakeTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetRewardToStakeTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }

  getStakeToMainTransactions(account: string, params?: any[]): boolean {
    if (!this.checkAccount()) {
      return false;
    }
    
    let data: Transaction[] = this.es.ipcRenderer.sendSync('stakeToMainTransactions', [account, params]);
    
    if (data) {
      this.store.dispatch(new GetStakeToMainTransactionsSuccess(data));
    } else {
      this.resolveError();
    }
    return true;
  }
  
  
  formatBalance(balance: string): number {
    return (parseFloat(parseInt(balance).toString(10)) / 1000000000000000000);
  }

  pad(n :string, width: number) : string{
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
  
  HexToValueString(hex : string): string{
    var t = hexToDec(hex);
  
    var big = bigInt(t.toString());
  
    var t2 = big.divide("1e18"); //0
    var m = big.mod("1e18"); //127
  
    return t2 + "." + this.pad(m.toString(), 18);
  }

  resolveError(error?): void {
    if (error && error.code && error.message) {
      throw new Error('[' + error.code + ']' + error.message);
    } else {
      throw new Error('[-99999]Berith Service Error');
    }
  }
  getDir( ): string {
     return this.es.ipcRenderer.sendSync("dialog" , null)
    // return 
  }
  importFile () : string {
    return this.es.ipcRenderer.sendSync("importFile", null)
  }
}