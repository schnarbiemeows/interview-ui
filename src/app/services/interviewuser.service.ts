import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ResponseMessage } from '../models/ResponseMessage';
import { InterviewUserDTO } from '../models/InterviewUserDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class InterviewUserService {
	getAllInterviewUserURL : string = 'http://localhost:8081/interviewuser/all';
	findInterviewUserByIdURL : string = 'http://localhost:8081/interviewuser/findById/{id}';
	createInterviewUserURL : string = 'http://localhost:8081/interviewuser/create';
	updateInterviewUserURL : string = 'http://localhost:8081/interviewuser/update';
	deleteInterviewUserURL : string = 'http://localhost:8081/interviewuser/delete/{id}';

    constructor(private http: HttpClient) { }

	getAllInterviewUser(): Observable<InterviewUserDTO[]> {
		return this.http.get<InterviewUserDTO[]>(this.getAllInterviewUserURL);
	}
	findInterviewUserById(id: number): Observable<InterviewUserDTO> {
		let findInterviewUserByIdURL_temp = this.findInterviewUserByIdURL.replace("{id}",id.toString(10));
		return this.http.get<InterviewUserDTO>(findInterviewUserByIdURL_temp);
	}
	createInterviewUser(data: InterviewUserDTO): Observable<InterviewUserDTO> {
		return this.http.post<InterviewUserDTO>(this.createInterviewUserURL, data, httpOptions);
	}
	updateInterviewUser(data: InterviewUserDTO): Observable<InterviewUserDTO> {
		return this.http.post<InterviewUserDTO>(this.updateInterviewUserURL, data, httpOptions);
	}
	deleteInterviewUser(id: number): Observable<ResponseMessage> {
		let deleteInterviewUserURL_temp = this.deleteInterviewUserURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(deleteInterviewUserURL_temp, httpOptions);
	}

}