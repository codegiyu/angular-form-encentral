import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {SuiModule} from 'ng2-semantic-ui';
// import { SuiCheckboxModule } from 'ng2-semantic-ui/dist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SuccessPageComponent } from './success-page/success-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuccessPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SuiCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
