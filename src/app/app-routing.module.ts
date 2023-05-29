import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "success", component: SuccessPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
