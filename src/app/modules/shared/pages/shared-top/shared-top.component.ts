import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';

import { SelectAccountComponent } from '../select-account/select-account.component';
import { NewAccountComponent } from '../new-account/new-account.component';
import { LockAccountComponent } from '../lock-account/lock-account.component';
import { ImportAccountComponent } from '../import-account/import-account.component';
import { ExportAccountComponent } from '../export-account/export-account.component';
import { AppState, selectAccount, selectIsLocked } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { Subject } from 'rxjs';
import * as file from 'fs';
import * as path from 'path'
import { takeUntil } from 'rxjs/operators';
import { BerithLogComponent } from '../berith-log/berith-log.component';
import { PendingTransactionsComponent } from '../pending-transactions/pending-transactions.component';

@Component({
  selector: 'app-shared-top',
  templateUrl: './shared-top.component.html',
  styleUrls: ['./shared-top.component.scss']
})
export class SharedTopComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  account : string;
  locked: boolean;
  args = process.argv.slice(1);
  serve = this.args.some(val => val === '--serve');

  isCollapsed: boolean;
  @Output() collapsed = new EventEmitter<boolean>();
  be: any;

  constructor(private store: Store<AppState>,
      private berithService: BerithService) { 
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
      this.isLocked();
    });
    store.select(selectIsLocked).pipe(takeUntil(this.unsubscribe)).subscribe( locked => {
       this.locked = locked ;
    });
  }

  ngOnInit() {
    this.isLocked();
  }

  isLocked() {
    this.berithService.isLocked(this.account);
  }

  @ViewChild(SelectAccountComponent)
  private selectAccountComponent: SelectAccountComponent;
  
  @ViewChild(NewAccountComponent)
  private newAccountComponent: NewAccountComponent;
    
  @ViewChild(LockAccountComponent)
  private lockAccountComponent: LockAccountComponent;
    
  @ViewChild(ImportAccountComponent)
  private importAccountComponent: ImportAccountComponent;
    
  @ViewChild(ExportAccountComponent)
  private exportAccountComponent: ExportAccountComponent;
    
  @ViewChild(BerithLogComponent)
  private berithLogComponent: BerithLogComponent;

  @ViewChild(PendingTransactionsComponent)
  private pendingTransactionsComponent: PendingTransactionsComponent;

  openSelectAccountModal() {
    this.selectAccountComponent.isVisible = true;
  }

  openNewAccountModal() {
    this.newAccountComponent.isVisible = true;
  }

  openUnLockAccountModal() {
    this.lockAccountComponent.isVisible = true;
  }

  openLockAccountModal() {
    this.lockAccountComponent.isVisible = true;
  }

  openImportAccountModal() {
    var fileDir = this.berithService.importFile()
    if( fileDir != null){
      var lastDIr = path.basename(fileDir[0]);
      var toDir = path.join(__dirname ,  '../../../Berith/testnet/keystore' ,lastDIr)
      console.log( "fileDir :::: " + fileDir[0])
      console.log( "lastDir :::  " + lastDIr)
      file.createReadStream(fileDir[0]).pipe(file.createWriteStream(toDir))
    }
  }

  openExportAccountModal() {
    var dir = path.join(__dirname ,  '../../../Berith/testnet/keystore' )
    var folderDir = this.berithService.getDir()
    if( folderDir != null){
      var files = file.readdirSync(dir);
      var Racc = this.account.substring(2)
      var Rdir 
      var jinDir 
      files.some((v)=> {
        Rdir = v.split("--")
        jinDir = v
        return (Rdir[2] == Racc)
      });
      var dir2 = path.join(dir , jinDir)
      var dir3 = path.join( folderDir[0] , jinDir  )
      file.createReadStream(dir2).pipe(file.createWriteStream(dir3))
    }
  }

  openBerithLogModal() {
    this.berithLogComponent.isVisible = true;
  }

  openPendingTransactionsModal() {
    this.pendingTransactionsComponent.isVisible = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
