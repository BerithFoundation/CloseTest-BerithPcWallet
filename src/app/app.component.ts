import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { BerithService } from './services/berith.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isCollapsed = false;
  
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private berithService: BerithService) {
    translate.setDefaultLang(navigator.language);
    
  }
  
  ngOnInit(): void {
    this.berithService.getCoinbase();
  }
  
  onCollapsed(isCollapsed: boolean) {
    this.isCollapsed = isCollapsed;
  }
}
