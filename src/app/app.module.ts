import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { InterviewUserComponent } from './components/interviewuser/interviewuser.component';
import { CategoriesAndLevelsComponent } from './components/categoriesandlevels/categories-and-levels.component';
import { QuestionsAndAnswersComponent } from './components/questionsandanswers/questions-and-answers.component';
import { ConfirmEmailComponent } from './components/confirmemail/confirmemail.component';
import { RegisterEmailSentComponent } from './components/emails/register/registeremailsent.component';
import { PasswordResetComponent } from './components/emails/passwordreset/passwordreset.component';
import { QuestionService } from './services/question/question.service';
import { QuestionCategoryService } from './services/questioncategory/questioncategory.service';
import { AnswerService } from './services/answer/answer.service';
import { QuestionLevelService } from './services/questionlevel/questionlevel.service';
import { InterviewUserService } from './services/interviewuser/interviewuser.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { NotificationService } from './services/notification/notification.service';
import { NotificationModule } from "./notification.module";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserinfoGuard } from "./guards/userinfo.guard";
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { ConfirmFieldsAreEqualDirective } from './directives/validators/confirm-fields-are-equal.directive';
import { RecaptchaModule } from "ng-recaptcha";
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { AboutComponent } from "./components/about/about.component";
import { AdminComponent } from "./components/admin/admin.component";

@NgModule({
  declarations: [
	  AppComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
    HeaderNavComponent,
	  InterviewUserComponent,
		CategoriesAndLevelsComponent,
		QuestionsAndAnswersComponent,
		UserinfoComponent,
    ConfirmEmailComponent,
    RegisterEmailSentComponent,
    PasswordResetComponent,
    AboutComponent,
    AdminComponent,
    ConfirmFieldsAreEqualDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NotificationModule,
    RecaptchaModule
  ],
  providers: [QuestionService,QuestionCategoryService,AnswerService,QuestionLevelService,InterviewUserService,AuthenticationService,NotificationService,
    AuthenticationGuard,AdminGuard,UserinfoGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
