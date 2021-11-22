import {Observable} from "rxjs/Observable";
import {QuestionDTO} from "../app/models/QuestionDTO";
import {QuestionAnswerItemDTO} from "../app/models/QuestionAnswerItemDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {of} from "rxjs/observable/of";

export class QuestionServiceStub {
  questions:QuestionDTO[] = [{
    questionId: 0,
    questionCategoryId: 0,
    questionLevelId: 0,
    answerId: 0,
    questionTxt: "what is Java?",
    evntTmestmp: null,
    evntOperId: "admin"
  },{
    questionId: 1,
    questionCategoryId: 1,
    questionLevelId: 0,
    answerId: 1,
    questionTxt: "what is Python?",
    evntTmestmp: null,
    evntOperId: "admin"
  },{
    questionId: 2,
    questionCategoryId: 2,
    questionLevelId: 0,
    answerId: 2,
    questionTxt: "what is Scala?",
    evntTmestmp: null,
    evntOperId: "admin"
  }];
  public getAllQuestion(): Observable<QuestionDTO[]> {
    return of(this.questions);
  }
  public findQuestionById(id: number): Observable<QuestionDTO> {
    return of(this.questions[id]);
  }
  public createQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    data.questionId = this.questions.length+1;
    this.questions.push(data);
    return of(data);
  }

  public createQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return of(data);
  }

  public updateQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return of(data);
  }

  public updateQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    this.questions[data.questionId] = data;
    return of(data);
  }
  public deleteQuestion(id: number): Observable<ResponseMessage> {
    this.questions = this.questions.filter(rec => rec.questionId != id);
    return of(new ResponseMessage("successfully deleted"));
  }

}
