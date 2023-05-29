import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { Observable, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    FormsModule,
    HttpClientModule,
    // Observable,
    // fromEvent,
    // map,
    // tap,
    // SuiCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
