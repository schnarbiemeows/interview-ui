import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionDTO } from '../../models/QuestionDTO';
import { QuestionAnswerItemDTO } from "../../models/QuestionAnswerItemDTO";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  host = environment.apiUrl;
  getAllQuestionURL : string = `${this.host}/question/all`;
  findQuestionByIdURL : string = `${this.host}/question/findById/`;
  createQuestionURL : string = `${this.host}/question/create`;
  updateQuestionURL : string = `${this.host}/question/update`;
  deleteQuestionURL : string = `${this.host}/question/delete/`;
  createQuestionAnswerURL : string = `${this.host}/question/createpair/`;
  updateQuestionAnswerURL : string = `${this.host}/question/updatepair/`;

  constructor(private http: HttpClient) { }

  getAllQuestion(): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(this.getAllQuestionURL);
  }
  findQuestionById(id: number): Observable<QuestionDTO> {
    //let findQuestionByIdURL_temp = this.findQuestionByIdURL.replace("{id}",id.toString(10));
    return this.http.get<QuestionDTO>(this.findQuestionByIdURL+`${id}`);
  }
  createQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(this.createQuestionURL, data, httpOptions);
  }
  updateQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(this.updateQuestionURL, data, httpOptions);
  }
  deleteQuestion(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(this.deleteQuestionURL+`${id}`, httpOptions);
  }
  createQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return this.http.post<QuestionAnswerItemDTO>(this.createQuestionAnswerURL, data, httpOptions);
  }
  updateQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return this.http.post<QuestionAnswerItemDTO>(this.updateQuestionAnswerURL, data, httpOptions);
  }
}
