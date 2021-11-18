import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ForgotUsernameComponent} from "./forgot-username/forgot-username.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RecaptchaModule} from "ng-recaptcha";


@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotUsernameComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SharedModule,
    RecaptchaModule
  ]
})
export class LoginModule { }
