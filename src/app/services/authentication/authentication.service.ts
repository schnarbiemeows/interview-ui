import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { InterviewUserDTO } from '../../models/interviewuserDTO';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  host = environment.apiUrl;
  token: string;
  loggedInUsername: string;
  jwtHelper = new JwtHelperService();
  loginURL : string = '/interviewuser/login';
  registerURL : string = '/interviewuser/register';

  constructor(private http: HttpClient) { }

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.loginURL}`, user, { observe: 'response' });
  }

  register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.registerURL}`, user);
  }

  logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalCache(user: InterviewUserDTO): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): InterviewUserDTO {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  getToken(): string {
    return this.token;
  }

  isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }

}
