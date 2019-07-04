import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-import-account',
  templateUrl: './import-account.component.html',
  styleUrls: ['./import-account.component.scss']
})
export class ImportAccountComponent implements OnInit {
  @Input() isVisible = false;

  constructor() {}

  ngOnInit() {
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
  