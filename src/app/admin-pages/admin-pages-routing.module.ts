import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPageComponent} from "./admin-page/admin-page/admin-page.component";
import {CategoriesAndLevelsComponent} from "./categories-and-levels/categories-and-levels/categories-and-levels.component";
import {QuestionsAndAnswersComponent} from "./questions-and-answers/questions-and-answers/questions-and-answers.component";
import {UsersAndAdminsComponent} from "./users-and-admins/users-and-admins/users-and-admins.component";
import { QuestionTotalsListItemComponent } from './admin-page/question-totals-list-item/question-totals-list-item.component';

export const routes: Routes = [
  { path: '' , component: AdminPageComponent},
  { path: 'categories-and-levels' , component: CategoriesAndLevelsComponent},
  { path: 'questions-and-answers' , component: QuestionsAndAnswersComponent},
  { path: 'users-and-admins' , component: UsersAndAdminsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
