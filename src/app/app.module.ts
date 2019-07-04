import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef, ViewChild, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { GlobalService } from './providers/global.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { SharedModule } from './modules/shared/shared.module';
import { BalanceModule } from './modules/balance/balance.module';
import { RewardModule } from './modules/reward/reward.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducers/app.reducers';
import { GlobalErrorHandler } from './global-error-handler';
import { AppService } from './services/app.service';

registerLocaleData(en);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    MainModule,
    SharedModule,
    BalanceModule,
    RewardModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ rootState: appReducer })
    //EffectsModule.forRoot([BerithEffects])
  ],
  providers: [
    ElectronService, 
    { provide: NZ_I18N, useValue: en_US }, 
    GlobalService ,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  triggerTemplate: TemplateRef<void> | null = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
