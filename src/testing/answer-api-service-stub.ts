import {Observable} from "rxjs/Observable";
import {AnswerDTO} from "../app/models/AnswerDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {of} from "rxjs/observable/of";

export class AnswerApiServiceStub {
  answers:AnswerDTO[] = [
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
  public getAllAnswer(): Observable<AnswerDTO[]> {
    return of(this.answers);
  }
  public findAnswerById(id: number): Observable<AnswerDTO> {
    return of(this.answers[id]);
  }
  public createAnswer(data: AnswerDTO): Observable<AnswerDTO> {
    data.answerId = this.answers.length+1;
    this.answers.push(data);
    return of(data);
  }
  public updateAnswer(data: AnswerDTO): Observable<AnswerDTO> {
    this.answers[data.answerId] = data;
    return of(data);
  }
  public deleteAnswer(id: number): Observable<ResponseMessage> {
    this.answers = this.answers.filter(rec => rec.answerId != id);
    return of(new ResponseMessage("successfully deleted"));
  }
}
