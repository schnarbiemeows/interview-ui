import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionCategoryDTO} from "../../models/QuestionCategoryDTO";

@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryService {

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

  constructor(private api: QuestionCategoryApiService) { }

  public changeAddMode(input: any) {
    this.addModeCategory.next(input);
  }

  public changeEditMode(input: any) {
    this.editModeCategory.next(input);
  }
  public disablePagination(input: any) {
    this.paginationDisabledCategory.next(input);
  }
  public changeShowForm(input: any) {
    this.showQuestionCategoryForm.next(input);
  }

  public reloadCategory() {
    this.loadedCategory.next(false);
    this.subscriptions.push(
      this.api.getAllQuestionCategory().subscribe(questioncategorylist => {
        this.questioncategorylist.next(questioncategorylist);
        this.fullquestioncategorylist = questioncategorylist;
        this.loadedCategory.next(true);
        this.showQuestionCategoryForm.next(false);
        this.editModeCategory.next(false);
        this.addModeCategory.next(false);
        this.paginationDisabledCategory.next(false);
      })
    );
  }

  public searchQuestionCategory(searchTerm: string): void {
    const results: QuestionCategoryDTO[] = this.fullquestioncategorylist.filter(rec => !this.isNullOrUndefined(rec.questionCategoryDesc) && rec.questionCategoryDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    this.questioncategorylist.next(results);
    if (results.length === 0 || !searchTerm) {
      this.questioncategorylist.next(this.fullquestioncategorylist);
    }
  }
  private isNullOrUndefined(input: any): boolean {
    if (input === 'undefined') return true;
    if (input == null) return true;
    return false;
  }

  public initiateAddCategory(): QuestionCategoryDTO {
    this.changeEditMode(false);
    this.changeAddMode(true);
    this.disablePagination(true);
    return this.categoryItem;
  }

  initiateEditCategoryItem(i: number): QuestionCategoryDTO {
    this.changeEditMode(true);
    this.paginationDisabledCategory.next(true);
    this.categoryItem = this.questioncategorylist.getValue()[i];
    this.showQuestionCategoryForm.next(true);
    return this.categoryItem;
  }

  public deleteCategoryItem(i: number) {
    this.subscriptions.push(
      this.api.deleteQuestionCategory(this.questioncategorylist.getValue()[i].questionCategoryId).subscribe(response => {
        this.reloadCategory();
        this.paginationDisabledCategory.next(true);
      })
    );
  }

  public saveResultsCategory(item: QuestionCategoryDTO) {
    if (this.addModeCategory.getValue()) {
      this.subscriptions.push(
        this.api.createQuestionCategory(item).subscribe(questioncategory => {
          this.reloadCategory();
          this.disablePagination(false);
        })
      );
    } else if (this.editModeCategory.getValue()) {
      this.subscriptions.push(
        this.api.updateQuestionCategory(item).subscribe(questioncategory => {
          this.reloadCategory();
          this.disablePagination(false);
        })
      );
    }
  }

  public destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
