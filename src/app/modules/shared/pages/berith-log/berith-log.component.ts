import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectBerithOut } from '../../../../store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-berith-log',
  templateUrl: './berith-log.component.html',
  styleUrls: ['./berith-log.component.scss']
})
export class BerithLogComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  LOG_SIZE = 1000;
  logs: string[] = [];
  
  @Input() isVisible = false;

  constructor(private store: Store<AppState>) { 
    store.select(selectBerithOut).pipe(takeUntil(this.unsubscribe)).subscribe( bertihOut => {
      if (this.logs.length >= this.LOG_SIZE) {
        this.logs.shift();
        this.logs.push(bertihOut);

      } else {
        this.logs.push(bertihOut);

      }
    });
  }

  ngOnInit() {
  }

  handleClear(): void {
    this.logs = [];
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
  