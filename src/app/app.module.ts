import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/Forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {QuestionService} from './services/question/question.service';
import {AnswerService} from './services/answer/answer.service';
import {NotificationService} from './services/notification/notification.service';
import {NotificationModule} from "./notification.module";
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthenticationGuard} from './guards/authentication.guard';
import {AdminGuard} from './guards/admin.guard';
import {UserinfoGuard} from "./guards/userinfo.guard";
import {ConfirmFieldsAreEqualDirective} from './directives/validators/confirm-fields-are-equal.directive';
import {RecaptchaModule} from "ng-recaptcha";
import {SharedModule} from "./shared/shared.module";
import {AnswerApiService} from "./api/answer-api/answer-api.service";
import {AuthenticationApiService} from "./api/authentication-api/authentication-api.service";
import {QuestionCategoryApiService} from "./api/question-category-api/question-category-api.service";
import {QuestionApiService} from "./api/question-api/question-api.service";
import {InterviewUserApiService} from "./api/interview-user-api/interview-user-api.service";
import {QuestionLevelApiService} from "./api/question-level-api/question-level-api.service";
import {QuestionCategoryService} from "./services/questioncategory/question-category.service";
import {QuestionLevelService} from "./services/questionlevel/question-level.service";
import {InterviewUserService} from "./services/interviewuser/interview-user.service";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {QuestionAndAnswersServiceStub} from "../testing/questions-and-answers-service-stub";
import {TestMockComponent} from "./test-mock/test-mock.component";
import {RealServiceService} from "./services/real-service.service";

@NgModule({
  declarations: [
	  AppComponent,
    TestMockComponent,
    ConfirmFieldsAreEqualDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NotificationModule,
    RecaptchaModule,
    SharedModule
  ],

  providers: [QuestionService,QuestionApiService,
    QuestionCategoryService, QuestionCategoryApiService,
    AnswerService,AnswerApiService,
    QuestionLevelService,QuestionLevelApiService,
    InterviewUserService,InterviewUserApiService,
    AuthenticationService,AuthenticationApiService,
    NotificationService,RealServiceService,
    AuthenticationGuard,AdminGuard,UserinfoGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
