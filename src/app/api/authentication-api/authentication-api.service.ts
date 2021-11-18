import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { InterviewUserDTO } from '../../models/interviewuserDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import {QuestionCategoryDTO} from "../../models/QuestionCategoryDTO";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {CheckResetPasswordResponseDTO} from "../../models/CheckResetPasswordResponseDTO";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  host = environment.apiUrl;
  token: string;
  loggedInUsername: string;
  jwtHelper = new JwtHelperService();
  loginURL : string = '/interviewuser/login';
  registerURL : string = '/interviewuser/register';
  confirmEmailURL : string = '/interviewuser/confirmemail';
  resetPasswordURL : string = '/interviewuser/forgotpassword';
  checkResetURL : string = '/interviewuser/checkreset';
  finalizeResetURL : string = '/interviewuser/finalizepassword';
  sendUsernameEmailURL : string = '/interviewuser/forgotusername';
  googleURL : string = `/recaptcha/post`;
  constructor(private http: HttpClient) { }

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.loginURL}`, user, { observe: 'response' });
  }

  register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.registerURL}`, user);
  }

  confirmEmail(id: string): Observable<InterviewUserDTO> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.confirmEmailURL}`, id);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.host}${this.resetPasswordURL}`, email);
  }

  checkReset(code: string): Observable<CheckResetPasswordResponseDTO> {
    return this.http.post<CheckResetPasswordResponseDTO>(`${this.host}${this.checkResetURL}`, code);
  }

  finalizeReset(dto: PasswordResetDTO): Observable<InterviewUserDTO> {
    return this.http.post<InterviewUserDTO>(`${this.host}${this.finalizeResetURL}`, dto);
  }

  sendUsernameEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.host}${this.sendUsernameEmailURL}`, email);
  }

  postRecaptcha(obj: GoogleRequestDTO): Observable<any> {
    return this.http.post<GoogleRequestDTO>(`${this.host}${this.googleURL}`, obj);
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
