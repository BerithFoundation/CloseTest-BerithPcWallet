import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GlobalService } from '../../providers/global.service'

@NgModule({
  declarations:[
    MainHomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  providers: [GlobalService]
})
export class MainModule { }
