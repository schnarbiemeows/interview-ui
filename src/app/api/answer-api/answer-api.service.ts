import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { AnswerDto } from '../../models/answer-dto';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AnswerApiService {
  host = environment.apiUrl;
  getAllAnswerURL : string = `${this.host}/answer/all`;
  findAnswerByIdURL : string = `${this.host}/answer/findById/`;
  createAnswerURL : string = `${this.host}/answer/create`;
  updateAnswerURL : string = `${this.host}/answer/update`;
  deleteAnswerURL : string = `${this.host}/answer/delete/`;

  constructor(private http: HttpClient) { }

  getAllAnswer(): Observable<AnswerDto[]> {
    return this.http.get<AnswerDto[]>(this.getAllAnswerURL);
  }
  findAnswerById(id: number): Observable<AnswerDto> {
    //let findAnswerByIdURL_temp = this.findAnswerByIdURL.replace("{id}",id.toString(10));
    return this.http.get<AnswerDto>(this.findAnswerByIdURL+`${id}`);
  }
  createAnswer(data: AnswerDto): Observable<AnswerDto> {
    return this.http.post<AnswerDto>(this.createAnswerURL, data, httpOptions);
  }
  updateAnswer(data: AnswerDto): Observable<AnswerDto> {
    return this.http.post<AnswerDto>(this.updateAnswerURL, data, httpOptions);
  }
  deleteAnswer(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(this.deleteAnswerURL+`${id}`, httpOptions);
  }
}
