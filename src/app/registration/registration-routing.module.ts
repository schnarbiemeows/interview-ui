import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {RegisterEmailSentComponent} from "./register-email-sent/register-email-sent.component";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";

const routes: Routes = [
  { path: '', component: RegistrationPageComponent},
  { path: 'emailsent/:email', component: RegisterEmailSentComponent},
  { path: 'confirmemail/:code', component: ConfirmEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
