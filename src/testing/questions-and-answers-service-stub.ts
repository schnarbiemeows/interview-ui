import {QuestionAnswerItemDTO} from "../app/models/QuestionAnswerItemDTO";
import {FilterParamsDTO} from "../app/models/FilterParamsDTO";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


export class QuestionAndAnswersServiceStub {

  private questionItemlist = new BehaviorSubject<QuestionAnswerItemDTO[]>(null);
  private item:QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
  private itemlist:QuestionAnswerItemDTO[] = [];

  constructor() {
    this.itemlist.push(this.item);
    this.questionItemlist.next(this.itemlist);
  }
  public reload() {
    console.log("inside the QuestionAndAnswersServiceStub.reload method");
  }
  public getCategories() {
    console.log("inside the QuestionAndAnswersServiceStub.getCategories method");
  }
  public getLevels() {
    console.log("inside the QuestionAndAnswersServiceStub.getLevels method");
  }
  public initiateAdd(): QuestionAnswerItemDTO {
    console.log("inside the QuestionAndAnswersServiceStub.initiateAdd method");
    return new QuestionAnswerItemDTO();
  }
  public initiateEditItem(i: number): QuestionAnswerItemDTO {
    console.log("inside the QuestionAndAnswersServiceStub.initiateEditItem method");
    return new QuestionAnswerItemDTO();
  }
  public deleteItem(i: number) {
    console.log("inside the QuestionAndAnswersServiceStub.deleteItem method");
  }
  public saveResults(questionAnswerItem: QuestionAnswerItemDTO) {
    console.log("inside the QuestionAndAnswersServiceStub.saveResults method");
  }
  public searchQuestionsAndAnswers(searchTerm: string): void {
    console.log("inside the QuestionAndAnswersServiceStub.searchQuestionsAndAnswers method");
  }
  public filter(params: FilterParamsDTO) {
    console.log("inside the QuestionAndAnswersServiceStub.filter method");
  }
  public resetFullList() {
    console.log("inside the QuestionAndAnswersServiceStub.resetFullList method");
  }
  public destroy() {
    console.log("inside the QuestionAndAnswersServiceStub.destroy method");
  }
}
