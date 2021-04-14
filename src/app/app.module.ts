import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/Forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InterviewUserComponent } from './components/interviewuser/interviewuser.component';
import { QuestionCategoryComponent } from './components/questioncategory/questioncategory.component';
import { QuestionLevelComponent } from './components/questionlevel/questionlevel.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionService } from './services/question.service';
import { QuestionCategoryService } from './services/questioncategory.service';
import { AnswerService } from './services/answer.service';
import { QuestionLevelService } from './services/questionlevel.service';
import { InterviewUserService } from './services/interviewuser.service';


@NgModule({
  declarations: [
	AppComponent,
	NavbarComponent,
		InterviewUserComponent,
		QuestionCategoryComponent,
		QuestionLevelComponent,
		AnswerComponent,
		QuestionComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	NgxPaginationModule,
	FormsModule
  ],
  providers: [QuestionService,QuestionCategoryService,AnswerService,QuestionLevelService,InterviewUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }