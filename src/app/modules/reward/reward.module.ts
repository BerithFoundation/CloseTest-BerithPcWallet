import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardRoutingModule } from './reward-routing.module';
import { RewardHomeComponent } from './pages/reward-home/reward-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RewardHomeComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    SharedModule
  ]
})
export class RewardModule { }
