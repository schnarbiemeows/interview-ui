import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoRoutingModule } from './contact-info-routing.module';
import {ContactInfoPageComponent} from "./contact-info-page/contact-info-page.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ContactInfoPageComponent],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ContactInfoModule { }
