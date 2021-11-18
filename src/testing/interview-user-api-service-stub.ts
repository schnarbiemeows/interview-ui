import {Observable} from "rxjs/Observable";
import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {InterviewUserDTOWrapper} from "../app/models/InterviewUserDTOWrapper";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {CustomHttpRespone} from "../app/models/custom-http-response";

export class InterviewUserApiServiceStub {
  getAllInterviewUser(): Observable<InterviewUserDTO[]> {
    //return this.http.get<InterviewUserDTO[]>(this.getAllInterviewUserURL);
    return null;
  }
  findInterviewUserById(id: number): Observable<InterviewUserDTO> {
    //let findInterviewUserByIdURL_temp = this.findInterviewUserByIdURL.replace("{id}",id.toString(10));
    //return this.http.get<InterviewUserDTO>(this.findInterviewUserByIdURL+`${id}`);
    return null;
  }
  createInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    //return this.http.post<InterviewUserDTO>(this.createInterviewUserURL, data, httpOptions);
    return null;
  }
  updateInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    //return this.http.post<InterviewUserDTO>(this.updateInterviewUserURL, data, httpOptions);
    return null;
  }

  updateUserByUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    //return this.http.post<InterviewUserDTO>(this.updateUserByUserURL, data, httpOptions);
    return null;
  }
  deleteInterviewUser(username: string): Observable<ResponseMessage> {
    //let deleteInterviewUserURL_temp = this.deleteInterviewUserURL.replace("{id}",id.toString(10));
    //return this.http.delete<ResponseMessage>(this.deleteInterviewUserURL+`${username}`, httpOptions);
    return null;
  }

  forgotPassword(email: string): Observable<CustomHttpRespone> {
   //return this.http.get<CustomHttpRespone>(this.forgotPwdURL+`${email}`);
    return null;
  }

  forgotUsername(email: string): Observable<CustomHttpRespone> {
    //return this.http.get<CustomHttpRespone>(this.forgotUsernameURL+`${email}`);
    return null;
  }

  public addUsersToLocalCache(users: InterviewUserDTO[]): void {
    //localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): InterviewUserDTO[] {
    /*if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }*/
    return null;
  }
}
