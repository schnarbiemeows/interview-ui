import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RecaptchaModule} from "ng-recaptcha";
import { RegisterEmailSentComponent } from './register-email-sent/register-email-sent.component';


@NgModule({
  declarations: [
    RegistrationPageComponent,
    ConfirmEmailComponent,
    RegisterEmailSentComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    FormsModule,
    RecaptchaModule
  ]
})
export class RegistrationModule { }
