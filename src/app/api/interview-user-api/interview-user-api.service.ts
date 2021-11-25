import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ResponseMessage } from '../../models/ResponseMessage';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import { InterviewUserDTOWrapper } from '../../models/InterviewUserDTOWrapper';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class InterviewUserApiService {
  testUsers:InterviewUserDTO[] = null;
  host = environment.apiUrl;
  getAllInterviewUserURL : string = `${this.host}/interviewuser/all`;
  findInterviewUserByIdURL : string = `${this.host}/interviewuser/findById/`;
  createInterviewUserURL : string = `${this.host}/interviewuser/create`;
  updateInterviewUserURL : string = `${this.host}/interviewuser/update`;
  updateUserByUserURL : string = `${this.host}/interviewuser/updateuserbyuser`;
  deleteInterviewUserURL : string = `${this.host}/interviewuser/delete/`;

  constructor(private http: HttpClient) { }

  getAllInterviewUser(): Observable<InterviewUserDTO[]> {
    return this.http.get<InterviewUserDTO[]>(this.getAllInterviewUserURL);
  }
  findInterviewUserById(id: number): Observable<InterviewUserDTO> {
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
    return this.http.delete<ResponseMessage>(this.deleteInterviewUserURL+`${username}`, httpOptions);
  }

}
