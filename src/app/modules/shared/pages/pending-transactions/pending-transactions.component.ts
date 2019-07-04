import { Component, OnInit , Input, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import { AppState, selectTxpool } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as bigInt from 'big-integer'
import * as hexToDec from 'hex-to-dec'

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit ,OnDestroy {
  data = [];
  selectIndex : string;
  
  private _isVisible: boolean;

  @Input() set isVisible(value: boolean) {
    if (value) {
      this.berithService.getPendingTransaction();
    }
    this._isVisible = value;
  }
  
  get isVisible(): boolean {
      return this._isVisible;
  }

  private unsubscribe: Subject<void> = new Subject();
  
  constructor(private message: NzMessageService,
    private store: Store<AppState>,
    private berithService: BerithService) { 
    store.select(selectTxpool).pipe(takeUntil(this.unsubscribe)).subscribe( txpool => this.data = txpool );
    }

  ngOnInit() {
    
    this.berithService.getPendingTransaction();
  }

  handleOk(): void {
    if( this.selectIndex != null){
      alert("okokok")
    }else{
      alert("항목을 선택해라")
    }
  }

  withdraw() : void {
    if( this.selectIndex != null){
      //alert(this.data[this.selectIndex].nonce)
      var account =this.data[this.selectIndex].from
      var gas =this.HexToValueString2(this.data[this.selectIndex].gasPrice)
      var nonce = this.data[this.selectIndex].nonce
      let result = this.berithService.sendTransaction2(account, gas ,nonce)
      if (result) {
        this.message.success(' 전송이 취소 되었습니다.', {
          nzDuration: 3000
        });
      }
      this.isVisible = false;
    }else{
      this.message.warning('항목을 선택하세요.');
    }
  }
  getTransactionText(base, target ) {
    
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
  HexToValueString2(hex : string): string{
    return parseInt(hex).toString(10)
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
  handleCancel(): void {
    this.isVisible = false;
  }

  select(index: any): void {
    this.selectIndex = index;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
