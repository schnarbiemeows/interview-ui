import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionLevelDTO } from '../../models/QuestionLevelDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class QuestionLevelService {
  host = environment.apiUrl;
	getAllQuestionLevelURL : string = `${this.host}/questionlevel/all`;
	findQuestionLevelByIdURL : string = `${this.host}/questionlevel/findById/`;
	createQuestionLevelURL : string = `${this.host}/questionlevel/create`;
	updateQuestionLevelURL : string = `${this.host}/questionlevel/update`;
	deleteQuestionLevelURL : string = `${this.host}/questionlevel/delete/`;

    constructor(private http: HttpClient) { }

	getAllQuestionLevel(): Observable<QuestionLevelDTO[]> {
		return this.http.get<QuestionLevelDTO[]>(this.getAllQuestionLevelURL);
	}
	findQuestionLevelById(id: number): Observable<QuestionLevelDTO> {
		//let findQuestionLevelByIdURL_temp = this.findQuestionLevelByIdURL.replace("{id}",id.toString(10));
		return this.http.get<QuestionLevelDTO>(this.findQuestionLevelByIdURL+`${id}`);
	}
	createQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
		return this.http.post<QuestionLevelDTO>(this.createQuestionLevelURL, data, httpOptions);
	}
	updateQuestionLevel(data: QuestionLevelDTO): Observable<QuestionLevelDTO> {
		return this.http.post<QuestionLevelDTO>(this.updateQuestionLevelURL, data, httpOptions);
	}
	deleteQuestionLevel(id: number): Observable<ResponseMessage> {
		//let deleteQuestionLevelURL_temp = this.deleteQuestionLevelURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(this.deleteQuestionLevelURL+`${id}`, httpOptions);
	}

}
