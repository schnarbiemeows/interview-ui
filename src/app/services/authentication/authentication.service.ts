import { Injectable } from '@angular/core';
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationApiService} from "../../api/authentication-api/authentication-api.service";
import {Observable} from "rxjs";
import {CheckPasswordResetResponseDTO} from "../../models/CheckPasswordResetResponseDTO";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string;
  loggedInUsername: string;
  jwtHelper = new JwtHelperService();

  constructor(private api: AuthenticationApiService) { }


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

  public getUserFromLocalCache(): InterviewUserDTO {
    console.log("inside AuthenticationService.getUserFromLocalCache method");
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

  checkReset(code: string): Observable<CheckPasswordResetResponseDTO> {
    return this.api.checkReset(code);
  }

  resetPassword(email: string): Observable<any> {
    return this.api.resetPassword(email);
  }

  finalizeReset(dto: PasswordResetDTO): Observable<InterviewUserDTO> {
    return this.api.finalizeReset(dto);
  }

  sendUsernameEmail(email: string): Observable<any> {
    return this.api.sendUsernameEmail(email);
  }

  postRecaptcha(obj: GoogleRequestDTO): Observable<any> {
    return this.api.postRecaptcha(obj);
  }

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
    return this.api.login(user);
  }

  register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    return this.api.register(user);
  }

  confirmEmail(id: string): Observable<InterviewUserDTO> {
    return this.api.confirmEmail(id);
  }
}
