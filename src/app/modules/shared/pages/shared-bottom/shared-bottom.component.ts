import { Component, OnInit } from '@angular/core';
import { AppState, selectPeersOut, selectSyncingOut } from '../../../../store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shared-bottom',
  templateUrl: './shared-bottom.component.html',
  styleUrls: ['./shared-bottom.component.scss']
})
export class SharedBottomComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();
  peers = 0;
  percent = 0;
  status = ''; // 'success'｜'exception'｜'active'

  constructor(private store: Store<AppState>) { 
    store.select(selectPeersOut).pipe(takeUntil(this.unsubscribe)).subscribe( peersOut => {
      this.peers = peersOut;
    });
    store.select(selectSyncingOut).pipe(takeUntil(this.unsubscribe)).subscribe( syncingOut => {
      this.percent = syncingOut;
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.percent = this.percent + 0;
      this.peers = this.peers + 0;
     }, 1000);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
