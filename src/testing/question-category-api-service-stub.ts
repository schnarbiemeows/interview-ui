import {Observable} from "rxjs/Observable";
import {QuestionCategoryDTO} from "../app/models/QuestionCategoryDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {of} from "rxjs/observable/of";

export class QuestionCategoryApiServiceStub {

  categories:QuestionCategoryDTO[] = [{
    questionCategoryId: 0,
    questionCategoryDesc: "Java - Core",
    evntTmestmp: null,
    evntOperId: "admin",
    displayCde: "Y"
  },{
    questionCategoryId: 1,
    questionCategoryDesc: "Python",
    evntTmestmp: null,
    evntOperId: "admin",
    displayCde: "Y"
  },{
    questionCategoryId: 2,
    questionCategoryDesc: "Scala",
    evntTmestmp: null,
    evntOperId: "admin",
    displayCde: "Y"
  }];
  getAllQuestionCategory(): Observable<QuestionCategoryDTO[]> {
    return of(this.categories);
  }
  findQuestionCategoryById(id: number): Observable<QuestionCategoryDTO> {
    return of(this.categories[id]);
  }
  createQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
    data.questionCategoryId = this.categories.length+1;
    this.categories.push(data);
    return of(data);
  }
  updateQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
    this.categories[data.questionCategoryId] = data;
    return of(data);
  }
  deleteQuestionCategory(id: number): Observable<ResponseMessage> {
    this.categories = this.categories.filter(rec => rec.questionCategoryId != id);
    return of(new ResponseMessage("successfully deleted"));
  }
}
