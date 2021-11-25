import {Observable} from "rxjs/Observable";
import {AnswerDto} from "../app/models/answer-dto";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {of} from "rxjs/observable/of";

export class AnswerServiceStub {
  answers:AnswerDto[] = [
    {
      answerId: 0,
      answerTxt: "a cool language",
      evntTmestmp: null,
      evntOperId: "admin"
    },
    {
      answerId: 1,
      answerTxt: "a cool language",
      evntTmestmp: null,
      evntOperId: "admin"
    },
    {
      answerId: 2,
      answerTxt: "a cool language",
      evntTmestmp: null,
      evntOperId: "admin"
    }
  ];
  public getAllAnswer(): Observable<AnswerDto[]> {
    return of(this.answers);
  }
  public findAnswerById(id: number): Observable<AnswerDto> {
    return of(this.answers[id]);
  }
  public createAnswer(data: AnswerDto): Observable<AnswerDto> {
    data.answerId = this.answers.length+1;
    this.answers.push(data);
    return of(data);
  }
  public updateAnswer(data: AnswerDto): Observable<AnswerDto> {
    this.answers[data.answerId] = data;
    return of(data);
  }
  public deleteAnswer(id: number): Observable<ResponseMessage> {
    this.answers = this.answers.filter(rec => rec.answerId != id);
    return of(new ResponseMessage("successfully deleted"));
  }
}
