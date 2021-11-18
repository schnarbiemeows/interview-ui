import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/Forms";
import {NgxPaginationModule} from "ngx-pagination";
import { CategoriesAndLevelsComponent } from './categories-and-levels/categories-and-levels/categories-and-levels.component';
import { LevelListComponent } from './categories-and-levels/level-list/level-list.component';
import { LevelListItemComponent } from './categories-and-levels/level-list-item/level-list-item.component';
import { CategoryListComponent } from './categories-and-levels/category-list/category-list.component';
import { CategoryListItemComponent } from './categories-and-levels/category-list-item/category-list-item.component';
import { LevelFormComponent } from './categories-and-levels/level-form/level-form.component';
import { CategoryFormComponent } from './categories-and-levels/category-form/category-form.component';
import { QuestionsAndAnswersComponent } from './questions-and-answers/questions-and-answers/questions-and-answers.component';
import { FilterQuestionsAndAnswersComponent } from './questions-and-answers/filter-questions-and-answers/filter-questions-and-answers.component';
import { QuestionsAndAnswersListComponent } from './questions-and-answers/questions-and-answers-list/questions-and-answers-list.component';
import { QuestionsAndAnswersFormComponent } from './questions-and-answers/questions-and-answers-form/questions-and-answers-form.component';
import { QuestionsAndAnswersListItemComponent } from './questions-and-answers/questions-and-answers-list-item/questions-and-answers-list-item.component';
import { UsersAndAdminsComponent } from './users-and-admins/users-and-admins/users-and-admins.component';
import { UsersAndAdminsSidebarComponent } from './users-and-admins/users-and-admins-sidebar/users-and-admins-sidebar.component';
import { UsersAndAdminsListComponent } from './users-and-admins/users-and-admins-list/users-and-admins-list.component';
import { UsersAndAdminsListItemComponent } from './users-and-admins/users-and-admins-list-item/users-and-admins-list-item.component';
import { UsersAndAdminsFormComponent } from './users-and-admins/users-and-admins-form/users-and-admins-form.component';
import {QuestionAndAnswersServiceStub} from "../../testing/questions-and-answers-service-stub";


@NgModule({
  declarations: [
    AdminPageComponent,
    CategoriesAndLevelsComponent,
    LevelListComponent,
    LevelListItemComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    LevelFormComponent,
    CategoryFormComponent,
    QuestionsAndAnswersComponent,
    FilterQuestionsAndAnswersComponent,
    QuestionsAndAnswersListComponent,
    QuestionsAndAnswersFormComponent,
    QuestionsAndAnswersListItemComponent,
    UsersAndAdminsComponent,
    UsersAndAdminsSidebarComponent,
    UsersAndAdminsListComponent,
    UsersAndAdminsListItemComponent,
    UsersAndAdminsFormComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AdminPagesModule { }
