import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ElectronService } from '../../../../providers/electron.service';

import { AppState, selectAccount, selectBalance, selectStakeBalance, selectRewardBalance, selectMainToMainTransactions, selectTransactions, selectNewTransactionOut } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { TranslateService } from '@ngx-translate/core';
import { Transaction } from '../../../../../../host/assets/model/transaction.schema';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as bigInt from 'big-integer'

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit, OnDestroy {
  
  private unsubscribe: Subject<void> = new Subject();
  account : string;
  balance : string;
  stakeBalance : string;
  rewardBalance : string;
  totalBalance : string;
  listOfData: Transaction[];

  initializing = false;

  constructor(private store: Store<AppState>,
      private berithService: BerithService,
      private translate: TranslateService,
      private es: ElectronService) {
  }

  ngOnInit() {
    this.initializing = true;
    this.store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
      this.getBalance();
      this.getTransactions();
    });
    this.store.select(selectBalance).pipe(takeUntil(this.unsubscribe)).subscribe( balance => this.balance = balance );
    this.store.select(selectStakeBalance).pipe(takeUntil(this.unsubscribe)).subscribe( stakeBalance => this.stakeBalance = stakeBalance );
    this.store.select(selectRewardBalance).pipe(takeUntil(this.unsubscribe)).subscribe( rewardBalance => this.rewardBalance = rewardBalance );
    this.store.select(selectTransactions).pipe(takeUntil(this.unsubscribe)).subscribe( listOfData => this.listOfData = listOfData );
    this.store.select(selectNewTransactionOut).pipe(takeUntil(this.unsubscribe)).subscribe( newTransactionOut => {
      if (!this.initializing) {
        this.getBalance();
        this.getTransactions();
      }
    });
    this.initializing = false;
  }

  getBalance() {
    this.berithService.getBalance(this.account);
    this.berithService.getStakeBalance(this.account);
    this.berithService.getRewardBalance(this.account);
  }

  getTransactions() {
    this.berithService.getTransactions(this.account);
  }
  getTotalBalance(){
    return parseFloat(this.balance) + parseFloat(this.rewardBalance) + parseFloat(this.stakeBalance) 
  }
  getTotalBalance2(){
    
    return "100000"
  }
  getTransactionText(base, target , receive) {
    if( receive == "y"){
      return 'Receive';
    }else {
      if (base == 1 && target == 1) {
        return 'Send';
      } else if (base == 1 && target == 2) {
        return 'Main → Stake';
      } else if (base == 2 && target == 1) {
        return 'Stake → Main';
      } else if ( base  == 1 && target == 3 ){
        return 'Main → Reward';
      }else if ( base  == 3 && target == 1 ){
        return 'Reward → Main';
      }else if ( base  == 3 && target == 2 ){
        return 'Reward → Stake';
      }
      return base + ' → ' + target;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
