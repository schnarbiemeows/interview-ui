import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactInfoPageComponent} from "./contact-info-page/contact-info-page.component";

const routes: Routes = [
  { path: '', component: ContactInfoPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactInfoRoutingModule { }
