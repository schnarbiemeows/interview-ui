import {Observable} from "rxjs/Observable";
import {AnswerDTO} from "../app/models/AnswerDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";

export class AnswerServiceStub {

  getAllAnswer(): Observable<AnswerDTO[]> {
   // return this.http.get<AnswerDTO[]>(this.getAllAnswerURL);
    return null;
  }
  findAnswerById(id: number): Observable<AnswerDTO> {
    //let findAnswerByIdURL_temp = this.findAnswerByIdURL.replace("{id}",id.toString(10));
    //return this.http.get<AnswerDTO>(this.findAnswerByIdURL+`${id}`);
    return null;
  }
  createAnswer(data: AnswerDTO): Observable<AnswerDTO> {
    //return this.http.post<AnswerDTO>(this.createAnswerURL, data, httpOptions);
    return null;
  }
  updateAnswer(data: AnswerDTO): Observable<AnswerDTO> {
    //return this.http.post<AnswerDTO>(this.updateAnswerURL, data, httpOptions);
    return null;
  }
  deleteAnswer(id: number): Observable<ResponseMessage> {
    //let deleteAnswerURL_temp = this.deleteAnswerURL.replace("{id}",id.toString(10));
    //return this.http.delete<ResponseMessage>(this.deleteAnswerURL+`${id}`, httpOptions);
    return null;
  }
}
