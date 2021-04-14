import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ResponseMessage } from '../models/ResponseMessage';
import { AnswerDTO } from '../models/AnswerDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class AnswerService {
	getAllAnswerURL : string = 'http://localhost:8081/answer/all';
	findAnswerByIdURL : string = 'http://localhost:8081/answer/findById/{id}';
	createAnswerURL : string = 'http://localhost:8081/answer/create';
	updateAnswerURL : string = 'http://localhost:8081/answer/update';
	deleteAnswerURL : string = 'http://localhost:8081/answer/delete/{id}';

    constructor(private http: HttpClient) { }

	getAllAnswer(): Observable<AnswerDTO[]> {
		return this.http.get<AnswerDTO[]>(this.getAllAnswerURL);
	}
	findAnswerById(id: number): Observable<AnswerDTO> {
		let findAnswerByIdURL_temp = this.findAnswerByIdURL.replace("{id}",id.toString(10));
		return this.http.get<AnswerDTO>(findAnswerByIdURL_temp);
	}
	createAnswer(data: AnswerDTO): Observable<AnswerDTO> {
		return this.http.post<AnswerDTO>(this.createAnswerURL, data, httpOptions);
	}
	updateAnswer(data: AnswerDTO): Observable<AnswerDTO> {
		return this.http.post<AnswerDTO>(this.updateAnswerURL, data, httpOptions);
	}
	deleteAnswer(id: number): Observable<ResponseMessage> {
		let deleteAnswerURL_temp = this.deleteAnswerURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(deleteAnswerURL_temp, httpOptions);
	}

}