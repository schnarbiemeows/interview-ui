import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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
export class QuestionService {
  host = environment.apiUrl;
	getAllQuestionURL : string = `${this.host}/question/all`;
	findQuestionByIdURL : string = `${this.host}/question/findById/`;
	createQuestionURL : string = `${this.host}/question/create`;
	updateQuestionURL : string = `${this.host}/question/update`;
	deleteQuestionURL : string = `${this.host}/question/delete/`;
  createQuestionAnswerURL : string = `${this.host}/question/createpair/`;
  updateQuestionAnswerURL : string = `${this.host}/question/updatepair/`;
	findQuestionByQuestionCategoryIdURL : string = `${this.host}/question/findByQuestionCategoryId/`;
	findQuestionByQuestionLevelIdURL : string = `${this.host}/question/findByQuestionLevelId/`;
	findQuestionByAnswerIdURL : string = `${this.host}/question/findByAnswerId/`;
	findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL : string = `${this.host}/question/findByQuestionCategoryIdAndQuestionLevelIdAndAnswerId/`;

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

  createQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return this.http.post<QuestionAnswerItemDTO>(this.createQuestionAnswerURL, data, httpOptions);
  }

  updateQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    return this.http.post<QuestionAnswerItemDTO>(this.updateQuestionAnswerURL, data, httpOptions);
  }

	updateQuestion(data: QuestionDTO): Observable<QuestionDTO> {
		return this.http.post<QuestionDTO>(this.updateQuestionURL, data, httpOptions);
	}
	deleteQuestion(id: number): Observable<ResponseMessage> {
		//let deleteQuestionURL_temp = this.deleteQuestionURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(this.deleteQuestionURL+`${id}`, httpOptions);
	}

	findQuestionByQuestionCategoryId(id: number): Observable<QuestionDTO[]>{
		//let findQuestionByQuestionCategoryIdURL_temp = this.findQuestionByQuestionCategoryIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionCategoryIdURL+`${id}`);
	}
	findQuestionByQuestionLevelId(id: number): Observable<QuestionDTO[]>{
		//let findQuestionByQuestionLevelIdURL_temp = this.findQuestionByQuestionLevelIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionLevelIdURL+`${id}`);
	}
	findQuestionByAnswerId(id: number): Observable<QuestionDTO[]>{
		//let findQuestionByAnswerIdURL_temp = this.findQuestionByAnswerIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(this.findQuestionByAnswerIdURL+`${id}`);
	}
	findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerId(id0: number,id1: number,id2: number): Observable<QuestionDTO[]>{
		//this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL = this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL.replace("{id0}", id0.toString(10)).replace("{id1}", id1.toString(10)).replace("{id2}", id2.toString(10));
		return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL+`${id0}/${id1}/${id2}`);
	}
}
