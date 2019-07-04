import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceHomeComponent } from './pages/balance-home/balance-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BalanceHomeComponent],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
  ]
})
export class BalanceModule { }
