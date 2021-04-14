import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ResponseMessage } from '../models/ResponseMessage';
import { QuestionDTO } from '../models/QuestionDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class QuestionService {
	getAllQuestionURL : string = 'http://localhost:8081/question/all';
	findQuestionByIdURL : string = 'http://localhost:8081/question/findById/{id}';
	createQuestionURL : string = 'http://localhost:8081/question/create';
	updateQuestionURL : string = 'http://localhost:8081/question/update';
	deleteQuestionURL : string = 'http://localhost:8081/question/delete/{id}';
	findQuestionByQuestionCategoryIdURL : string = 'http://localhost:8081/question/findByQuestionCategoryId/{id}';
	findQuestionByQuestionLevelIdURL : string = 'http://localhost:8081/question/findByQuestionLevelId/{id}';
	findQuestionByAnswerIdURL : string = 'http://localhost:8081/question/findByAnswerId/{id}';
	findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL : string = 'http://localhost:8081/question/findByQuestionCategoryIdAndQuestionLevelIdAndAnswerId/{id0}/{id1}/{id2}';

    constructor(private http: HttpClient) { }

	getAllQuestion(): Observable<QuestionDTO[]> {
		return this.http.get<QuestionDTO[]>(this.getAllQuestionURL);
	}
	findQuestionById(id: number): Observable<QuestionDTO> {
		let findQuestionByIdURL_temp = this.findQuestionByIdURL.replace("{id}",id.toString(10));
		return this.http.get<QuestionDTO>(findQuestionByIdURL_temp);
	}
	createQuestion(data: QuestionDTO): Observable<QuestionDTO> {
		return this.http.post<QuestionDTO>(this.createQuestionURL, data, httpOptions);
	}
	updateQuestion(data: QuestionDTO): Observable<QuestionDTO> {
		return this.http.post<QuestionDTO>(this.updateQuestionURL, data, httpOptions);
	}
	deleteQuestion(id: number): Observable<ResponseMessage> {
		let deleteQuestionURL_temp = this.deleteQuestionURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(deleteQuestionURL_temp, httpOptions);
	}

	findQuestionByQuestionCategoryId(id: number): Observable<QuestionDTO[]>{
		let findQuestionByQuestionCategoryIdURL_temp = this.findQuestionByQuestionCategoryIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(findQuestionByQuestionCategoryIdURL_temp);
	}
	findQuestionByQuestionLevelId(id: number): Observable<QuestionDTO[]>{
		let findQuestionByQuestionLevelIdURL_temp = this.findQuestionByQuestionLevelIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(findQuestionByQuestionLevelIdURL_temp);
	}
	findQuestionByAnswerId(id: number): Observable<QuestionDTO[]>{
		let findQuestionByAnswerIdURL_temp = this.findQuestionByAnswerIdURL.replace("{id}", id.toString(10));
		return this.http.get<QuestionDTO[]>(findQuestionByAnswerIdURL_temp);
	}
	findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerId(id0: number,id1: number,id2: number): Observable<QuestionDTO[]>{
		this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL = this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL.replace("{id0}", id0.toString(10)).replace("{id1}", id1.toString(10)).replace("{id2}", id2.toString(10));
		return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL);
	}
}