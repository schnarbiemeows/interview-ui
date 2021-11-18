import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {QuestionCategoryDTO} from "../../models/QuestionCategoryDTO";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {QuestionLevelDTO} from "../../models/QuestionLevelDTO";

@Injectable({
  providedIn: 'root'
})
export class QuestionLevelService {

  private subscriptions: Subscription[] = [];
  private levelItem:QuestionLevelDTO = {
    questionLevelId: null,
    questionLevelDesc: '',
    evntTmestmp: null,
    evntOperId: ''
  };
  private loadedLevel = new BehaviorSubject<boolean>(false);
  private addModeLevel = new BehaviorSubject<boolean>(false);
  private editModeLevel = new BehaviorSubject<boolean>(false);
  private showQuestionLevelForm = new BehaviorSubject<boolean>(false);
  private questionlevellist = new BehaviorSubject<QuestionLevelDTO[]>(null);
  private fullquestionlevellist: QuestionLevelDTO[]= [];
  public loaded$ = this.loadedLevel.asObservable();
  public addMode$ = this.addModeLevel.asObservable();
  public editMode$ = this.editModeLevel.asObservable();
  public showForm$ = this.showQuestionLevelForm.asObservable();
  public questionlevellist$ = this.questionlevellist.asObservable();


  constructor(private api: QuestionLevelApiService) { }

  public changeLoaded(input: any) {
    this.loadedLevel.next(input);
  }
  public changeAddMode(input: any) {
    this.addModeLevel.next(input);
  }

  public changeEditMode(input: any) {
    this.editModeLevel.next(input);
  }

  public changeShowForm(input: any) {
    this.showQuestionLevelForm.next(input);
  }

  public reloadLevel() {
    this.loadedLevel.next(false);
    this.subscriptions.push(
      this.api.getAllQuestionLevel().subscribe(questionlevellist => {
        this.questionlevellist.next(questionlevellist);
        this.fullquestionlevellist = questionlevellist;
        this.loadedLevel.next(true);
        this.showQuestionLevelForm.next(false);
        this.editModeLevel.next(false);
        this.addModeLevel.next(false);
      })
    );
  }

  public searchQuestionLevel(searchTerm: string): void {
    const results: QuestionLevelDTO[] = [];
    for (const questionlevel of this.fullquestionlevellist) {
      if(!this.isNullOrUndefined(questionlevel.questionLevelDesc) && questionlevel.questionLevelDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(questionlevel);
      }
    }
    this.questionlevellist.next(results);
    if (results.length === 0 || !searchTerm) {
      this.questionlevellist.next(this.fullquestionlevellist);
    }
  }

  private isNullOrUndefined(input: any): boolean {
    if (input === 'undefined') return true;
    if (input == null) return true;
    return false;
  }

  public initiateAddLevel(): QuestionLevelDTO {
    this.changeEditMode(false);
    this.changeAddMode(true);
    return this.levelItem;
  }

  initiateEditLevelItem(i: number): QuestionLevelDTO {
    this.changeEditMode(true);
    this.levelItem = this.questionlevellist.getValue()[i];
    this.showQuestionLevelForm.next(true);
    return this.levelItem;
  }

  public deleteLevelItem(i: number) {
    this.subscriptions.push(
      this.api.deleteQuestionLevel(this.questionlevellist.getValue()[i].questionLevelId).subscribe(response => {
        this.reloadLevel();
      })
    );
  }
  public saveResultsLevel(item: QuestionLevelDTO) {
    if(this.addModeLevel.getValue()) {
      this.subscriptions.push(
        this.api.createQuestionLevel(item).subscribe(questionlevel => {
          this.reloadLevel();
        })
      );
    } else if(this.editModeLevel.getValue()) {
      this.subscriptions.push(
        this.api.updateQuestionLevel(item).subscribe(questionlevel => {
          this.reloadLevel();
        })
      );
    }
  }

  public destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
