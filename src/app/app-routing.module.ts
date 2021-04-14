import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewUserComponent } from './components/interviewuser/interviewuser.component';
import { QuestionCategoryComponent } from './components/questioncategory/questioncategory.component';
import { QuestionLevelComponent } from './components/questionlevel/questionlevel.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
{ path: 'interviewuser', component: InterviewUserComponent },
{ path: 'questioncategory', component: QuestionCategoryComponent },
{ path: 'questionlevel', component: QuestionLevelComponent },
{ path: 'answer', component: AnswerComponent },
{ path: 'question', component: QuestionComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }