import { Component, OnInit, Input ,NgZone ,OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';

import { NzMessageService } from 'ng-zorro-antd'
import { BerithService } from '../../../../services/berith.service';
import { AppState, selectAccounts, selectAccount } from '../../../../store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss']
})
export class SelectAccountComponent implements OnInit, OnDestroy {
  data = [];
  selectItem : string;

  private unsubscribe: Subject<void> = new Subject();
  account: string;

  private _isVisible: boolean;

  @Input() set isVisible(value: boolean) {
    if (value) {
      this.berithService.getAccounts();
    }
    this._isVisible = value;
    this.selectItem = this.account;
  }
  
  get isVisible(): boolean {
      return this._isVisible;
  }

  constructor(private message: NzMessageService,
      private store: Store<AppState>,
      private berithService: BerithService) {
    store.select(selectAccounts).pipe(takeUntil(this.unsubscribe)).subscribe( accounts => this.data = accounts );
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
    });
  }

  ngOnInit() {
    this.berithService.getAccounts();
  }

  handleOk(): void {
    let result = this.berithService.setBerithbase(this.selectItem);
    if (result) {
      this.message.success(this.selectItem +' 계정으로 지갑 변경이 완료 되었습니다.', {
        nzDuration: 3000
      });
    }

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  select(item: any): void {
    this.selectItem = item;
  }

  ngOnDestroy(): void {
    
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
