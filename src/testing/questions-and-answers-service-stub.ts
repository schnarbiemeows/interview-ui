import {QuestionAnswerItemDTO} from "../app/models/QuestionAnswerItemDTO";
import {FilterParamsDTO} from "../app/models/FilterParamsDTO";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {QuestionDTO} from "../app/models/QuestionDTO";
import {ForeignKeyOptionsDTO} from "../app/models/ForeignKeyOptionsDTO";
import {QuestionApiService} from "../app/api/question-api/question-api.service";
import {AnswerApiService} from "../app/api/answer-api/answer-api.service";
import {QuestionCategoryApiService} from "../app/api/question-category-api/question-category-api.service";
import {QuestionLevelApiService} from "../app/api/question-level-api/question-level-api.service";
import {QuestionLevelApiServiceStub} from "./question-level-api-service-stub";
import {QuestionCategoryApiServiceStub} from "./question-category-api-service-stub";
import {AnswerApiServiceStub} from "./answer-api-service-stub";
import {QuestionApiServiceStub} from "./question-api-service-stub";


export class QuestionAndAnswersServiceStub {

  private subscriptions: Subscription[] = [];
  private questionList: QuestionDTO[] = [];
  private answermap = new Map();
  private questioncategorylistTemp:ForeignKeyOptionsDTO[] = [];
  private questioncategorylist = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private questionlevellistTemp:ForeignKeyOptionsDTO[] = [];
  private questionlevellist = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private questionCategoryFormListTemp:ForeignKeyOptionsDTO[] = [];
  private questionCategoryFormList = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private questionLevelFormListTemp:ForeignKeyOptionsDTO[] = [];
  private questionLevelFormList = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private loaded = new BehaviorSubject<boolean>(false);
  private addMode = new BehaviorSubject<boolean>(false);
  private editMode = new BehaviorSubject<boolean>(false);
  private showQuestionForm = new BehaviorSubject<boolean>(false);
  private questionItemlist = new BehaviorSubject<QuestionAnswerItemDTO[]>(null);
  private fullquestionItemlist: QuestionAnswerItemDTO[]= [];
  private totalQuestions = new BehaviorSubject<number>(0);
  private filterCategoryValue = new BehaviorSubject<number>(null);
  private filterDifficultyValue = new BehaviorSubject<number>(null);
  private paginationDisabled = new BehaviorSubject<boolean>(false);
  public loaded$ = this.loaded.asObservable();
  public addMode$ = this.addMode.asObservable();
  public editMode$ = this.editMode.asObservable();
  public showForm$ = this.showQuestionForm.asObservable();
  public questioncategorylist$ = this.questioncategorylist.asObservable();
  public questionlevellist$ = this.questionlevellist.asObservable();
  public questionCategoryFormList$ = this.questionCategoryFormList.asObservable();
  public questionLevelFormList$ = this.questionLevelFormList.asObservable();
  public questionItemlist$ = this.questionItemlist.asObservable();
  public totalQuestions$ = this.totalQuestions.asObservable();
  public filterCategoryValue$ = this.filterCategoryValue.asObservable();
  public filterDifficultyValue$ = this.filterDifficultyValue.asObservable();
  public paginationDisabled$ = this.paginationDisabled.asObservable();


  public reload() {

  }
  public getCategories() {

  }
  public getLevels() {

  }
  public initiateAdd(): QuestionAnswerItemDTO {

    return new QuestionAnswerItemDTO();
  }
  public initiateEditItem(i: number): QuestionAnswerItemDTO {

    return new QuestionAnswerItemDTO();
  }
  public deleteItem(i: number) {

  }
  public saveResults(questionAnswerItem: QuestionAnswerItemDTO) {

  }
  public searchQuestionsAndAnswers(searchTerm: string): void {

  }
  public filter(params: FilterParamsDTO) {

  }
  public resetFullList() {

  }

  public getQuestionTotals() {

  }

  destroy() {

  }
}
