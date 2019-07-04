import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-left',
  templateUrl: './shared-left.component.html',
  styleUrls: ['./shared-left.component.scss']
})
export class SharedLeftComponent implements OnInit {
  @Input() isCollapsed;
  
  constructor() { }

  ngOnInit() {
  }

}
