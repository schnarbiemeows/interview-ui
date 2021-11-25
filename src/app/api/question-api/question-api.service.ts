import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionDTO } from '../../models/QuestionDTO';
import { QuestionAnswerItemDTO } from "../../models/QuestionAnswerItemDTO";
import {QuestionTotalsDto} from "../../admin-pages/admin-page/models/question-totals-dto";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

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
  getAllQuestionTotalsURL : string = `${this.host}/question/totals`;
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
  getAllQuestionTotals(): Observable<QuestionTotalsDto[]> {
    return this.http.get<QuestionTotalsDto[]>(this.getAllQuestionTotalsURL).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
