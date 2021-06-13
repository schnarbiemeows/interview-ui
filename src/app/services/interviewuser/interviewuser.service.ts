import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { CustomHttpRespone } from '../../models/custom-http-response';
import { ResponseMessage } from '../../models/ResponseMessage';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { InterviewUserDTOWrapper } from '../../models/InterviewUserDTOWrapper';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class InterviewUserService {
  host = environment.apiUrl;
	getAllInterviewUserURL : string = `${this.host}/interviewuser/all`;
	findInterviewUserByIdURL : string = `${this.host}/interviewuser/findById/`;
	createInterviewUserURL : string = `${this.host}/interviewuser/create`;
	updateInterviewUserURL : string = `${this.host}/interviewuser/update`;
  updateUserByUserURL : string = `${this.host}/interviewuser/updateuserbyuser`;
	deleteInterviewUserURL : string = `${this.host}/interviewuser/delete/`;
	forgotPwdURL : string = `${this.host}/interviewuser/forgotpassword/`;
  forgotUsernameURL : string = `${this.host}/interviewuser/forgotusername/`;
    constructor(private http: HttpClient) { }

	getAllInterviewUser(): Observable<InterviewUserDTO[]> {
		return this.http.get<InterviewUserDTO[]>(this.getAllInterviewUserURL);
	}
	findInterviewUserById(id: number): Observable<InterviewUserDTO> {
		//let findInterviewUserByIdURL_temp = this.findInterviewUserByIdURL.replace("{id}",id.toString(10));
		return this.http.get<InterviewUserDTO>(this.findInterviewUserByIdURL+`${id}`);
	}
	createInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
		return this.http.post<InterviewUserDTO>(this.createInterviewUserURL, data, httpOptions);
	}
	updateInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
		return this.http.post<InterviewUserDTO>(this.updateInterviewUserURL, data, httpOptions);
	}

  updateUserByUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    return this.http.post<InterviewUserDTO>(this.updateUserByUserURL, data, httpOptions);
  }
	deleteInterviewUser(username: string): Observable<ResponseMessage> {
		//let deleteInterviewUserURL_temp = this.deleteInterviewUserURL.replace("{id}",id.toString(10));
		return this.http.delete<ResponseMessage>(this.deleteInterviewUserURL+`${username}`, httpOptions);
	}

  forgotPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(this.forgotPwdURL+`${email}`);
  }

  forgotUsername(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(this.forgotUsernameURL+`${email}`);
  }

  public addUsersToLocalCache(users: InterviewUserDTO[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): InterviewUserDTO[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }
}
