import { NgModule } from '@angular/core';
import { RewardHomeComponent } from './pages/reward-home/reward-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "reward",
    component: RewardHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule { }
