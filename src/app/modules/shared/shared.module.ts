import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalService } from '../../providers/global.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedTopComponent } from './pages/shared-top/shared-top.component';
import { SharedLeftComponent } from './pages/shared-left/shared-left.component';
import { MainRoutingModule } from '../main/main-routing.module';
import { BalanceRoutingModule } from '../balance/balance-routing.module';
import { RewardRoutingModule } from '../reward/reward-routing.module';
import { SelectAccountComponent } from './pages/select-account/select-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewAccountComponent } from './pages/new-account/new-account.component';
import { LockAccountComponent } from './pages/lock-account/lock-account.component';
import { ImportAccountComponent } from './pages/import-account/import-account.component';
import { ExportAccountComponent } from './pages/export-account/export-account.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedBottomComponent } from './pages/shared-bottom/shared-bottom.component';
import { BerithLogComponent } from './pages/berith-log/berith-log.component';
import { PendingTransactionsComponent } from './pages/pending-transactions/pending-transactions.component';

@NgModule({
  imports: [
    MainRoutingModule,
    BalanceRoutingModule,
    RewardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  exports: [
    TranslateModule,
    SharedTopComponent,
    SharedLeftComponent,
    SharedBottomComponent,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  declarations: [SharedTopComponent, SharedLeftComponent, SharedBottomComponent, SelectAccountComponent, NewAccountComponent, LockAccountComponent, ImportAccountComponent, ExportAccountComponent, BerithLogComponent, PendingTransactionsComponent],
  entryComponents: [
    SelectAccountComponent,
    NewAccountComponent,
    LockAccountComponent, 
    ImportAccountComponent, 
    ExportAccountComponent,
    BerithLogComponent,
    PendingTransactionsComponent
  ],
  providers: [GlobalService]
})
export class SharedModule {
  
 }
