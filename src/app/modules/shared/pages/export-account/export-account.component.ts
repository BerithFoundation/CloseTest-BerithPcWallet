import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as file from 'fs';
import * as path from 'path'
import { AppState, selectAccount } from '../../../../store';
import { BerithService } from '../../../../services/berith.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-export-account',
  templateUrl: './export-account.component.html',
  styleUrls: ['./export-account.component.scss']
})
export class ExportAccountComponent implements OnInit, OnDestroy{
  @Input() isVisible = false;
  private unsubscribe: Subject<void> = new Subject();
  account : string;

  constructor(private store: Store<AppState>,
    private berithService: BerithService) {
    store.select(selectAccount).pipe(takeUntil(this.unsubscribe)).subscribe( account => {
      this.account = account;
    });
  }

  ngOnInit() {
  }

  handleOk(fileDir): void {
    // var dir = path.join(__dirname ,  '../../../../../../Berith/testnet/keystore' )
    // var files = file.readdirSync(dir);
    // var Racc = this.account.substring(2)
    // var Rdir 
    // var jinDir 
    // files.some((v)=> {
    //   Rdir = v.split("--")
    //   jinDir = v
    //   return (Rdir[2] == Racc)
    // });
    // console.log( "jinDir ::: " + jinDir)
    // var dir2 = path.join(dir , jinDir)
    // console.log( "dir2 ::: " + dir2)
    // console.log( "fileDir ::: " + fileDir)
    
    // var dir3 = path.join( fileDir , jinDir  )
    // file.createReadStream(dir2).pipe(file.createWriteStream(dir3))
    // this.berithService.getDir()
    // this.isVisible = false;
    this.berithService.getDir()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
  