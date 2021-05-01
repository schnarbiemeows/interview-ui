import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { RegisterComponent } from './components/register/register.component';
import { InterviewUserComponent } from './components/interviewuser/interviewuser.component';
import { QuestionCategoryComponent } from './components/questioncategory/questioncategory.component';
import { QuestionLevelComponent } from './components/questionlevel/questionlevel.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import {AdminGuard} from "./guards/admin.guard";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {UserinfoGuard} from "./guards/userinfo.guard";
import {UserinfoComponent} from "./components/userinfo/userinfo.component";

const routes: Routes = [

{ path: 'login', component: LoginComponent},
{ path: 'mainpage', component: MainpageComponent },
{ path: 'admin', component: NavbarComponent, canActivate: [AdminGuard] },
{ path: 'register', component: RegisterComponent },
{ path: 'maincontent', component: RegisterComponent },
{ path: 'userinfo', component: UserinfoComponent },
{ path: 'interviewuser', component: InterviewUserComponent, canActivate: [AdminGuard] },
{ path: 'questioncategory', component: QuestionCategoryComponent, canActivate: [AdminGuard] },
{ path: 'questionlevel', component: QuestionLevelComponent, canActivate: [AdminGuard] },
{ path: 'answer', component: AnswerComponent, canActivate: [AdminGuard] },
{ path: 'question', component: QuestionComponent, canActivate: [AdminGuard] },
{ path: '', redirectTo: '/mainpage', pathMatch: 'full' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }
