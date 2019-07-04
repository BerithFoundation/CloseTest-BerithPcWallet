import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { AppState, selectBalance, selectRewardBalance, selectAccount, selectRewardTransactions, selectIsLocked, selectNewTransactionOut, selectSyncingOut } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { Transaction } from '../../../../../../host/assets/model/transaction.schema';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reward-home',
  templateUrl: './reward-home.component.html',
  styleUrls: ['./reward-home.component.scss']
})
export class RewardHomeComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  account : string;
  locked : boolean;
  balance : string;
  rewardBalance : string;
  syncingOut : number;

  listOfData: Transaction[];
  
  rewardToBalanceForm: FormGroup;
  rewardToStakeForm: FormGroup;

  initializing = false;

  constructor(private message: NzMessageService,
      private store: Store<AppState>,
      private berithService: BerithService,
      private fb: FormBuilder,
      private modal: NzModalService) {
    this.initializing = true;
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
      this.getBalance();
      this.getTransactions();
      this.resetFormState();
    });
    store.select(selectIsLocked).pipe(takeUntil(this.unsubscribe)).subscribe( locked => this.locked = locked );
    store.select(selectBalance).pipe(takeUntil(this.unsubscribe)).subscribe( balance => this.balance = balance );
    store.select(selectRewardBalance).pipe(takeUntil(this.unsubscribe)).subscribe( rewardBalance => this.rewardBalance = rewardBalance );
    store.select(selectRewardTransactions).pipe(takeUntil(this.unsubscribe)).subscribe( listOfData => this.listOfData = listOfData );
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
    this.rewardToBalanceForm = this.fb.group({
      rtbAmt: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$'), this.validateBalanceFormat]]
    });
  
    this.rewardToStakeForm = this.fb.group({
      rtsAmt: ['', [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$'), this.validateBalanceFormat]]
    });
  }

  getBalance() {
    this.berithService.getBalance(this.account);
    this.berithService.getRewardBalance(this.account);
  }

  getTransactions() {
    this.berithService.getRewardTransactions(this.account);
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

  rewardToBalance() {
    if (!this.checkAccount()) {
      return false;
    }

    if (this.rewardToBalanceForm.invalid) {
      return;
    }

    this.modal.confirm({
      nzTitle: '지금 보내시겠습니까?',
      nzContent: '',
      nzOnOk: () => {
        let result = this.berithService.sendRewardToBalance(this.account, this.rewardToBalanceForm.value.rtbAmt);
        if (result) {
          this.message.info('reward To Balance 성공 !! ');
          this.resetFormState();
        }
      }
    });

    return false;
  }

  rewardToStake() {
    if (!this.checkAccount()) {
      return false;
    }

    if (this.rewardToStakeForm.invalid) {
      return;
    }

    this.modal.confirm({
      nzTitle: '지금 보내시겠습니까?',
      nzContent: '',
      nzOnOk: () => {
        let result = this.berithService.sendRewardToStake(this.account, this.rewardToStakeForm.value.rtsAmt);
        if (result) {
          this.message.info('reward To stake 성공 !! ');
          this.resetFormState();
        }
      }
    });

    return false;
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
    if (this.rewardToBalanceForm != null) {
      this.rewardToBalanceForm.reset();
    }
    if (this.rewardToStakeForm != null) {
      this.rewardToStakeForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
