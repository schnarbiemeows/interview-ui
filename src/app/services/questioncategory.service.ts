import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ResponseMessage } from '../models/ResponseMessage';
import { QuestionCategoryDTO } from '../models/QuestionCategoryDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class QuestionCategoryService {
	getAllQuestionCategoryURL : string = 'http://localhost:8081/questioncategory/all';
	findQuestionCategoryByIdURL : string = 'http://localhost:8081/questioncategory/findById/{id}';
	createQuestionCategoryURL : string = 'http://localhost:8081/questioncategory/create';
	updateQuestionCategoryURL : string = 'http://localhost:8081/questioncategory/update';
	deleteQuestionCategoryURL : string = 'http://localhost:8081/questioncategory/delete/{id}';

    constructor(private http: HttpClient) { }

	getAllQuestionCategory(): Observable<QuestionCategoryDTO[]> {
		return this.http.get<QuestionCategoryDTO[]>(this.getAllQuestionCategoryURL);
	}
	findQuestionCategoryById(id: number): Observable<QuestionCategoryDTO> {
		let findQuestionCategoryByIdURL_temp = this.findQuestionCategoryByIdURL.replace("{id}",id.toString(10));
		return this.http.get<QuestionCategoryDTO>(findQuestionCategoryByIdURL_temp);
	}
	createQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
		return this.http.post<QuestionCategoryDTO>(this.createQuestionCategoryURL, data, httpOptions);
	}
	updateQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
		return this.http.post<QuestionCategoryDTO>(this.updateQuestionCategoryURL, data, httpOptions);
	}
	deleteQuestionCategory(id: number): Observable<ResponseMessage> {
		let deleteQuestionCategoryURL_temp = this.deleteQuestionCategoryURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(deleteQuestionCategoryURL_temp, httpOptions);
	}

}