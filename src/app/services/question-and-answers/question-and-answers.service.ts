import { Injectable } from '@angular/core';
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {QuestionApiService} from "../../api/question-api/question-api.service";
import {AnswerApiService} from "../../api/answer-api/answer-api.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {QuestionLevelDTO} from "../../models/QuestionLevelDTO";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";
import {FilterParamsDTO} from "../../models/FilterParamsDTO";
import {AnswerDto} from "../../models/answer-dto";
import {QuestionDTO} from "../../models/QuestionDTO";
import {ForeignKeyOptionsDTO} from "../../models/ForeignKeyOptionsDTO";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionTotalsDto} from "../../admin-pages/admin-page/models/question-totals-dto";

@Injectable({
  providedIn: 'root'
})
export class QuestionAndAnswersService {

  private subscriptions: Subscription[] = [];
  private questionList: QuestionDTO[] = [];
  private answermap = new Map();
  private questioncategorylistTemp:ForeignKeyOptionsDTO[] = [];
  private questioncategorylist = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private questionlevellistTemp:ForeignKeyOptionsDTO[] = [];
  private questionlevellist = new BehaviorSubject<ForeignKeyOptionsDTO[]>(null);
  private questionTotalsList = new BehaviorSubject<QuestionTotalsDto[]>(null);
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
  public questionTotalsList$ = this.questionTotalsList.asObservable();
  public questionCategoryFormList$ = this.questionCategoryFormList.asObservable();
  public questionLevelFormList$ = this.questionLevelFormList.asObservable();
  public questionItemlist$ = this.questionItemlist.asObservable();
  public totalQuestions$ = this.totalQuestions.asObservable();
  public filterCategoryValue$ = this.filterCategoryValue.asObservable();
  public filterDifficultyValue$ = this.filterDifficultyValue.asObservable();
  public paginationDisabled$ = this.paginationDisabled.asObservable();

  constructor(private questionApi: QuestionApiService,
              private answerApi: AnswerApiService,
              private questionCategoryApi: QuestionCategoryApiService,
              private questionLevelApi: QuestionLevelApiService) {}

  public reload() {
    //console.log("inside the QuestionAndAnswersService.reload method");
    this.loaded.next(false);
    /**
     * load all of the questions
     */
    this.questionList = [];
    this.answermap = new Map();
    this.fullquestionItemlist = [];
    this.subscriptions.push(
      this.questionApi.getAllQuestion().subscribe(questionlist => {
        this.questionList = questionlist;
        /**
         * load all of the answers
         */
        this.subscriptions.push(
          this.answerApi.getAllAnswer().subscribe(answerlist => {
            for (let entry of answerlist) {
              this.answermap.set(entry.answerId, entry);
            }
            this.loadTheFullQuestionAnswerList(this.questionList, this.answermap);
            this.copyFullListIntoDisplayList();
            this.loaded.next(true);
            this.showQuestionForm.next(false);
            this.editMode.next(false);
            this.addMode.next(false);
            this.paginationDisabled.next(false);
            this.totalQuestions.next(this.fullquestionItemlist.length);
            this.reFilter(this.filterCategoryValue.getValue(),this.filterDifficultyValue.getValue());
          })
        );
      })
    );
  }

  public getCategories() {
    //console.log("inside the QuestionAndAnswersService.getCategories method");
    this.subscriptions.push(
      this.questionCategoryApi.getAllQuestionCategory().subscribe(questioncategorylist => {
        for (let entry of questioncategorylist) {
          let optionDTO = new ForeignKeyOptionsDTO();
          optionDTO.value = entry.questionCategoryId;
          optionDTO.viewValue = entry.questionCategoryDesc;
          this.questioncategorylistTemp.push(optionDTO);
        }
        this.questioncategorylist.next(this.questioncategorylistTemp);
        this.questionCategoryFormList.next(this.questioncategorylistTemp);
      })
    );
  }

  public getLevels() {
    //console.log("inside the QuestionAndAnswersService.getLevels method");
    this.subscriptions.push(
      this.questionLevelApi.getAllQuestionLevel().subscribe(questionlevellist => {
        for (let entry of questionlevellist) {
          let optionDTO = new ForeignKeyOptionsDTO();
          optionDTO.value = entry.questionLevelId;
          optionDTO.viewValue = entry.questionLevelDesc;
          this.questionlevellistTemp.push(optionDTO);
        }
        this.questionlevellist.next(this.questionlevellistTemp);
        this.questionLevelFormList.next(this.questionlevellistTemp);
      })
    );
  }

  public initiateAdd(): QuestionAnswerItemDTO {
    //console.log("inside the QuestionAndAnswersService.initiateAdd method");
    this.editMode.next(false);
    this.addMode.next(true);
    this.showQuestionForm.next(true);
    this.paginationDisabled.next(true);
    let item = new QuestionAnswerItemDTO();
    this.filterCategoryDropdown(item);
    this.filterDifficultyDropdown(item);
    return item;
  }

  public initiateEditItem(i: number): QuestionAnswerItemDTO {
    //console.log("inside the QuestionAndAnswersService.initiateEditItem method");
    this.editMode.next(true);
    this.addMode.next(false);
    this.paginationDisabled.next(true);
    this.showQuestionForm.next(true);
    let item = this.questionItemlist.getValue()[i];
    return item;
  }

  private filterCategoryDropdown(item: QuestionAnswerItemDTO) {
    if(this.filterCategoryValue.getValue() != null) {
      this.questioncategorylistTemp = this.questioncategorylist.getValue().filter(rec => rec.value == this.filterCategoryValue.getValue());
      this.questionCategoryFormList.next(this.questioncategorylistTemp);
      item.questionCategoryId = this.filterCategoryValue.getValue();
    }
  }

  private filterDifficultyDropdown(item: QuestionAnswerItemDTO) {
    if(this.filterDifficultyValue.getValue() != null) {
      this.questionlevellistTemp = this.questionlevellist.getValue().filter(rec => rec.value == this.filterDifficultyValue.getValue());
      this.questionLevelFormList.next(this.questionlevellistTemp);
      item.questionLevelId = this.filterDifficultyValue.getValue();
    }
  }

  public deleteItem(i: number) {
    this.subscriptions.push(
      this.questionApi.deleteQuestion(this.questionItemlist.getValue()[i].questionId).subscribe(response => {
        this.reload();
      })
    );
  }

  private loadTheFullQuestionAnswerList(questionList: QuestionDTO[], answermap: any) {
    questionList.forEach(item => {
      let dto:QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
      dto.questionId = item.questionId;
      dto.questionTxt = item.questionTxt;
      dto.answerId = item.answerId;
      let  answer:AnswerDto = answermap.get(item.answerId);
      dto.answerTxt = answer.answerTxt;
      dto.questionLevelId = item.questionLevelId;
      dto.questionCategoryId = item.questionCategoryId;
      this.fullquestionItemlist.push(dto);
    })
  }

  private copyFullListIntoDisplayList() {
    this.questionItemlist.next(this.fullquestionItemlist);
  }

  public saveResults(questionAnswerItem: QuestionAnswerItemDTO) {
    //console.log("inside the QuestionAndAnswersService.saveResults method");
    if (this.addMode.getValue()) {
      this.subscriptions.push(
        this.questionApi.createQuestionAnswerPair(questionAnswerItem).subscribe(question => {
          this.reload();
        })
      );
    } else if (this.editMode.getValue()) {
      this.subscriptions.push(
        this.questionApi.updateQuestionAnswerPair(questionAnswerItem).subscribe(question => {
          this.reload();
        })
      );
    }
  }

  public searchQuestionsAndAnswers(searchTerm: string): void {
    const results: QuestionAnswerItemDTO[] = this.fullquestionItemlist.filter(question =>
      !this.isNullOrUndefined(question.questionTxt) && question.questionTxt.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(question.answerTxt) && question.answerTxt.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    this.questionItemlist.next(results);
    if (results.length === 0 || !searchTerm) {
      this.questionItemlist.next(this.fullquestionItemlist);
    }
  }

  private isNullOrUndefined(input: any): boolean {
    if (input === 'undefined') return true;
    if (input == null) return true;
    return false;
  }

  public filter(params: FilterParamsDTO) {
    //console.log("inside the QuestionAndAnswersService.filter method");
    this.reFilter(params.filterCategoryValue, params.filterDifficultyValue);
  }

  private reFilter(categoryVal: number, difficultyVal: number) {
    const results: QuestionAnswerItemDTO[] = [];
    this.fullquestionItemlist.forEach(question => {
      if ( (categoryVal === null || categoryVal == question.questionCategoryId) &&
        (difficultyVal === null || difficultyVal == question.questionLevelId) ) {
        results.push(question);
      }
    })
    this.questionItemlist.next(results);
    this.totalQuestions.next(this.questionItemlist.getValue().length);
    this.filterCategoryValue.next(categoryVal);
    this.filterDifficultyValue.next(difficultyVal);
  }

  public resetFullList() {
    //console.log("inside the QuestionAndAnswersService.resetFullList method");
    this.questionItemlist.next(this.fullquestionItemlist);
    this.totalQuestions.next(this.questionItemlist.getValue().length);
    this.filterCategoryValue.next(null);
    this.filterDifficultyValue.next(null);
    this.questionlevellistTemp = [];
    this.questioncategorylistTemp = [];
    this.questionCategoryFormList.next(this.questioncategorylist.getValue());
    this.questionLevelFormList.next(this.questionlevellist.getValue());
  }

  public getQuestionTotals() {
    this.subscriptions.push(
      this.questionApi.getAllQuestionTotals().subscribe(questionTotalsList => {
        this.questionTotalsList.next(questionTotalsList);
      })
    );
  }
  public destroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
