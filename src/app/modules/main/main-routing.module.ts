import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { MainHomeComponent } from './pages/main-home/main-home.component';


const routes: Routes = [
  {
    path: "main",
    component: MainHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
