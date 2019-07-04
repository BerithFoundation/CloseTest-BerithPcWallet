import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { NzMessageService } from 'ng-zorro-antd'
import { AppState, selectAccount, selectIsLocked } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lock-account',
  templateUrl: './lock-account.component.html',
  styleUrls: ['./lock-account.component.scss']
})
export class LockAccountComponent implements OnInit, OnDestroy {
  private _isVisible: boolean;

  @Input() set isVisible(value: boolean) {
    if (value) {
      this.isLocked();
    }
    this._isVisible = value;
  }
  
  get isVisible(): boolean {
      return this._isVisible;
  }

  passwordVisible = false;
  password: string;

  private unsubscribe: Subject<void> = new Subject();
  account : string;
  locked: boolean;

  lockAccountForm: FormGroup;

  constructor(private message: NzMessageService,
      private store: Store<AppState>,
      private berithService: BerithService,
      private fb: FormBuilder) {
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
      this.isLocked();
    });
    store.select(selectIsLocked).pipe(takeUntil(this.unsubscribe)).subscribe( locked => this.locked = locked );
  }

  ngOnInit() {
    this.isLocked();

    this.lockAccountForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  isLocked() {
    this.berithService.isLocked(this.account);
  }

  handleOk(): void {
    console.warn(this.lockAccountForm.value);

    if (this.lockAccountForm.invalid) {
      return;
    }

    if (this.locked) {
      let result = this.berithService.unlockAccount(this.account, this.lockAccountForm.value.password);
      if (result) {
        this.message.info('계정이 잠금 해제 되었습니다.');
      } else {
        this.message.info('비밀번호를 잘못 입력하셨습니다.');
      }
    } else {
      let result = this.berithService.lockAccount(this.account, this.lockAccountForm.value.password);
      if (result) {
        this.message.info('계정이 잠금되었습니다');
      } else {
        this.message.info('비밀번호를 잘못 입력하셨습니다.');
      }
    }
    
    this.resetFormState();
  }

  handleCancel(): void {
    this.resetFormState();
  }

  resetFormState() {
    this.password = '';
    this.passwordVisible = false;
    this.isVisible = false;
    if (this.lockAccountForm != null) {
      this.lockAccountForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
  