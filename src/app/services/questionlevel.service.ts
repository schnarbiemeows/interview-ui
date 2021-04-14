import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ResponseMessage } from '../models/ResponseMessage';
import { QuestionLevelDTO } from '../models/QuestionLevelDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class QuestionLevelService {
	getAllQuestionLevelURL : string = 'http://localhost:8081/questionlevel/all';
	findQuestionLevelByIdURL : string = 'http://localhost:8081/questionlevel/findById/{id}';
	createQuestionLevelURL : string = 'http://localhost:8081/questionlevel/create';
	updateQuestionLevelURL : string = 'http://localhost:8081/questionlevel/update';
	deleteQuestionLevelURL : string = 'http://localhost:8081/questionlevel/delete/{id}';

    constructor(private http: HttpClient) { }

	getAllQuestionLevel(): Observable<QuestionLevelDTO[]> {
		return this.http.get<QuestionLevelDTO[]>(this.getAllQuestionLevelURL);
	}
	findQuestionLevelById(id: number): Observable<QuestionLevelDTO> {
		let findQuestionLevelByIdURL_temp = this.findQuestionLevelByIdURL.replace("{id}",id.toString(10));
		return this.http.get<QuestionLevelDTO>(findQuestionLevelByIdURL_temp);
	}
	createQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
		return this.http.post<QuestionLevelDTO>(this.createQuestionLevelURL, data, httpOptions);
	}
	updateQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
		return this.http.post<QuestionLevelDTO>(this.updateQuestionLevelURL, data, httpOptions);
	}
	deleteQuestionLevel(id: number): Observable<ResponseMessage> {
		let deleteQuestionLevelURL_temp = this.deleteQuestionLevelURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(deleteQuestionLevelURL_temp, httpOptions);
	}

}