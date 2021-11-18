import {Observable} from "rxjs/Observable";
import {QuestionLevelDTO} from "../app/models/QuestionLevelDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";

export class QuestionLevelApiServiceStub {

  getAllQuestionLevel(): Observable<QuestionLevelDTO[]> {
    //return this.http.get<QuestionLevelDTO[]>(this.getAllQuestionLevelURL);
    return null;
  }
  findQuestionLevelById(id: number): Observable<QuestionLevelDTO> {
    //let findQuestionLevelByIdURL_temp = this.findQuestionLevelByIdURL.replace("{id}",id.toString(10));
    //return this.http.get<QuestionLevelDTO>(this.findQuestionLevelByIdURL+`${id}`);
    return null;
  }
  createQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
    //return this.http.post<QuestionLevelDTO>(this.createQuestionLevelURL, data, httpOptions);
    return null;
  }
  updateQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
    //return this.http.post<QuestionLevelDTO>(this.updateQuestionLevelURL, data, httpOptions);
    return null;
  }
  deleteQuestionLevel(id: number): Observable<ResponseMessage> {
    //let deleteQuestionLevelURL_temp = this.deleteQuestionLevelURL.replace("{id}",id.toString(10));
    //return this.http.delete<ResponseMessage>(this.deleteQuestionLevelURL+`${id}`, httpOptions);
    return null;
  }
}
