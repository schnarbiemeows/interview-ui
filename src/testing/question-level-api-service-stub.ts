import {Observable} from "rxjs/Observable";
import {QuestionLevelDTO} from "../app/models/QuestionLevelDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {of} from "rxjs/observable/of";

export class QuestionLevelApiServiceStub {

  private levelItems:QuestionLevelDTO[] = [{
    questionLevelId: 0,
    questionLevelDesc: 'EASY',
    evntTmestmp: null,
    evntOperId: 'admin'
  },{
    questionLevelId: 1,
    questionLevelDesc: 'MEDIUM',
    evntTmestmp: null,
    evntOperId: 'admin'
  },{
    questionLevelId: 2,
    questionLevelDesc: 'HARD',
    evntTmestmp: null,
    evntOperId: 'admin'
  }];

  getAllQuestionLevel(): Observable<QuestionLevelDTO[]> {
    return of(this.levelItems);
  }
  findQuestionLevelById(id: number): Observable<QuestionLevelDTO> {
    return of(this.levelItems[id]);
  }
  createQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
    data.questionLevelId = this.levelItems.length+1;
    this.levelItems.push(data);
    return of(data);
  }
  updateQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
    this.levelItems[data.questionLevelId] = data;
    return of(data);
  }
  deleteQuestionLevel(id: number): Observable<ResponseMessage> {
    this.levelItems = this.levelItems.filter(rec => rec.questionLevelId != id);
    return of(new ResponseMessage("successfully deleted"));
  }
}
