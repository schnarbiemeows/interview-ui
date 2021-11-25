import {QuestionCategoryDTO} from "../app/models/QuestionCategoryDTO";
import {QuestionCategoryService} from "../app/services/questioncategory/question-category.service";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";



export class QuestionCategoryServiceStub {

  private subscriptions: Subscription[] = [];
  private categoryItem: QuestionCategoryDTO = {
    questionCategoryId: null,
    questionCategoryDesc: '',
    evntTmestmp: null,
    evntOperId: '',
    displayCde: ''
  };
  private loadedCategory = new BehaviorSubject<boolean>(false);
  private addModeCategory = new BehaviorSubject<boolean>(false);
  private editModeCategory = new BehaviorSubject<boolean>(false);
  private showQuestionCategoryForm = new BehaviorSubject<boolean>(false);
  private questioncategorylist = new BehaviorSubject<QuestionCategoryDTO[]>(null);
  private fullquestioncategorylist: QuestionCategoryDTO[] = [];
  private paginationDisabledCategory = new BehaviorSubject<boolean>(false);
  public loaded$ = this.loadedCategory.asObservable();
  public addMode$ = this.addModeCategory.asObservable();
  public editMode$ = this.editModeCategory.asObservable();
  public showForm$ = this.showQuestionCategoryForm.asObservable();
  public questioncategorylist$ = this.questioncategorylist.asObservable();
  public paginationDisabled$ = this.paginationDisabledCategory.asObservable();

  public changeLoaded(input: any) {

  }
  public changeAddMode(input: any) {

  }

  public changeEditMode(input: any) {

  }
  public disablePagination(input: any) {

  }
  public changeShowForm(input: any) {

  }

  public reloadCategory() {

  }

  public searchQuestionCategory(searchTerm: string): void {

  }

  public initiateAddCategory(): QuestionCategoryDTO {

    const dto:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    return dto;
  }

  initiateEditCategoryItem(i: number): QuestionCategoryDTO {

    const dto:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    return dto;
  }

  public deleteCategoryItem(i: number) {

  }

  public saveResultsCategory(item: QuestionCategoryDTO) {

  }

  public destroy() {

  }
}
