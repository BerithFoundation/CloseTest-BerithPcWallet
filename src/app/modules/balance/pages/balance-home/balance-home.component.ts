import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAccount, selectBalance, selectStakeBalance, selectMainTransactions, selectIsLocked, selectNewTransactionOut, selectSyncingOut } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Transaction } from '../../../../../../host/assets/model/transaction.schema';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-balance-home',
  templateUrl: './balance-home.component.html',
  styleUrls: ['./balance-home.component.scss']
})
export class BalanceHomeComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  account : string;
  locked : boolean;
  balance : string;
  stakeBalance : string;
  syncingOut : number;
  
  listOfData: Transaction[];

  transactionForm: FormGroup;
  stakeForm: FormGroup;
  
  initializing = false;

  constructor(private message: NzMessageService,
      private store: Store<AppState>,
      private berithService: BerithService,
      private fb: FormBuilder,
      private modal: NzModalService) {
    this.initializing = true;
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
      console.log('selectAccount: ' + this.initializing);
      this.getBalance();
      this.getTransactions();
      this.resetFormState();
    });
    store.select(selectIsLocked).pipe(takeUntil(this.unsubscribe)).subscribe( locked => this.locked = locked );
    store.select(selectBalance).pipe(takeUntil(this.unsubscribe)).subscribe( balance => this.balance = balance );
    store.select(selectStakeBalance).pipe(takeUntil(this.unsubscribe)).subscribe( stakeBalance => this.stakeBalance = stakeBalance );
    store.select(selectMainTransactions).pipe(takeUntil(this.unsubscribe)).subscribe( listOfData => this.listOfData = listOfData );
    store.select(selectSyncingOut).pipe(takeUntil(this.unsubscribe)).subscribe( syncingOut => this.syncingOut = syncingOut );
    store.select(selectNewTransactionOut).pipe(takeUntil(this.unsubscribe)).subscribe( newTransactionOut => {
      if (!this.initializing) {
        this.getBalance();
        this.getTransactions();
      }
    });
    this.initializing = false;
  }

  validateBalanceFormat(c: FormControl) {
    let str = String(c.value);
    let len = str.length;
    let lastIdx = len - 1;
    let pointIdx = str.indexOf('.');
    if (pointIdx != -1 && (lastIdx - pointIdx) > 8) {
        return {invalid1: { valid: false }};
    }
    return null;
  }

  ngOnInit() {
    this.transactionForm = this.fb.group({
      sendAdd: ['', [Validators.required]],
      sendAmt: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$'), this.validateBalanceFormat]]
    });
  
    this.stakeForm = this.fb.group({
      stakeAmt: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$'), this.validateBalanceFormat]]
    });
  }

  getBalance() {
    this.berithService.getBalance(this.account);
    this.berithService.getStakeBalance(this.account);
  }
  
  getTransactions() {
    this.berithService.getMainTransactions(this.account);
  }

  checkAccount(): boolean {
    if (!this.account) {
      this.message.warning('현재 생성된 계정이 없습니다.');
      return false;
    } else if (this.locked) {
      this.message.warning('현재 계정이 잠겨 있습니다.');
      return false;
    } else if (this.syncingOut < 100) {
      this.message.warning('현재 동기화 진행중 입니다.');
      return false;
    }
    return true;
  }

  // transaction 이벤트
  sendTransaction() {
    // 베타테스트기간 동안 사용안함
    // if (!this.checkAccount()) {
    //   return false;
    // }
    // console.warn(this.transactionForm.value);

    // this.modal.confirm({
    //   nzTitle: '지금 보내시겠습니까?',
    //   nzContent: '',
    //   nzOnOk: () => {
    //     let result = this.berithService.sendTransaction(this.account, this.transactionForm.value.sendAdd, this.transactionForm.value.sendAmt);
    //     if (result) {
    //       this.message.info('transaction 성공 !! ');
    //       this.resetFormState();
    //     }
    //   }
    // });

    this.message.info('테스트 기간 동안 \'보내기\' 기능이 제한됩니다.');

    return false;
  }
  
  //stake 이벤트
  stakeTransaction() {
    if (!this.checkAccount()) {
      return false;
    }
    console.warn(this.stakeForm.value);

    if (this.stakeForm.invalid) {
      return;
    }

    this.modal.confirm({
      nzTitle: '지금 보내시겠습니까?',
      nzContent: '',
      nzOnOk: () => {
        let result = this.berithService.stakeTransaction(this.account, this.stakeForm.value.stakeAmt);
        if (result) {
          this.message.info('stake 성공 !! ');
          this.resetFormState();
        }
      }
    });

    return false;
  }

  stopStaking(){
    if (!this.checkAccount()) {
      return false;
    }
    console.warn(this.stakeForm.value);

    if (this.stakeForm.invalid) {
      return;
    }

    let result = this.berithService.stopStaking(this.account);
    if (result) {
      setTimeout(()=>{
        let miningStop = this.berithService.miningStop();
      }, 20000)
      this.message.info("stopStaking 성공!! ");
    }
  }
  miningStart(){
    if (!this.checkAccount()) {
      return false;
    }

    let start = this.berithService.miningStart();
    this.message.info("mining 성공!! " );
  }
  miningStop(){
    if (!this.checkAccount()) {
      return false;
    }

    let miningStop = this.berithService.miningStop();
    this.message.info("miningStop 성공!! " );
  }

  confirm(){
    this.message.info('stopstaking ');
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

  resetFormState() {
    if (this.transactionForm != null) {
      this.transactionForm.reset();
    }
    if (this.stakeForm != null) {
      this.stakeForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
