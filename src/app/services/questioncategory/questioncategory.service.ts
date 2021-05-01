import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionCategoryDTO } from '../../models/QuestionCategoryDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class QuestionCategoryService {
  host = environment.apiUrl;
	getAllQuestionCategoryURL : string = `${this.host}/questioncategory/all`;
	findQuestionCategoryByIdURL : string = `${this.host}/questioncategory/findById/`;
	createQuestionCategoryURL : string = `${this.host}/questioncategory/create`;
	updateQuestionCategoryURL : string = `${this.host}/questioncategory/update`;
	deleteQuestionCategoryURL : string = `${this.host}/questioncategory/delete/`;

    constructor(private http: HttpClient) { }

	getAllQuestionCategory(): Observable<QuestionCategoryDTO[]> {
		return this.http.get<QuestionCategoryDTO[]>(this.getAllQuestionCategoryURL);
	}
	findQuestionCategoryById(id: number): Observable<QuestionCategoryDTO> {
		//let findQuestionCategoryByIdURL_temp = this.findQuestionCategoryByIdURL.replace("{id}",id.toString(10));
		return this.http.get<QuestionCategoryDTO>(this.findQuestionCategoryByIdURL+`${id}`);
	}
	createQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
		return this.http.post<QuestionCategoryDTO>(this.createQuestionCategoryURL, data, httpOptions);
	}
	updateQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
		return this.http.post<QuestionCategoryDTO>(this.updateQuestionCategoryURL, data, httpOptions);
	}
	deleteQuestionCategory(id: number): Observable<ResponseMessage> {
		//let deleteQuestionCategoryURL_temp = this.deleteQuestionCategoryURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(this.deleteQuestionCategoryURL+`${id}`, httpOptions);
	}

}
