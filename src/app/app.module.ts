import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DxDashboardControlModule } from 'devexpress-dashboard-angular';
import { DevExtremeModule, DxButtonModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxDashboardControlModule,
    DevExtremeModule,
    DxPopupModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
