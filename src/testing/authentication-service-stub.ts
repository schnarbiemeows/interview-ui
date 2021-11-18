import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {Observable} from "rxjs";
import {CheckResetPasswordResponseDTO} from "../app/models/CheckResetPasswordResponseDTO";
import {PasswordResetDTO} from "../app/models/PasswordResetDTO";
import {GoogleRequestDTO} from "../app/models/GoogleRequestDTO";
import {HttpResponse} from "@angular/common/http";
import {Role} from "../app/enum/role.enum";

export class AuthenticationServiceStub {

  logOut(): void {
    /*this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');*/
  }

  saveToken(token: string): void {
    /*this.token = token;
    localStorage.setItem('token', token);*/
  }

  addUserToLocalCache(user: InterviewUserDTO): void {
    //localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): InterviewUserDTO {
    console.log("inside AuthenticationServiceStub.getUserFromLocalCache method");
    const dto:InterviewUserDTO = {
      userId: 0,
      authorizations: [],
      emailAddr: '',
      firstName: '',
      userActive: true,
      userNotLocked: true,
      joinDate: null,
      lastLoginDate: null,
      lastLoginDateDisplay: null,
      lastName: '',
      password: '',
      profileImage: '',
      roles: Role.USER,
      userIdentifier: '',
      userName: ''
    };
    return dto;
  }

  loadToken(): void {
    //this.token = localStorage.getItem('token');
  }

  getToken(): string {
    //return this.token;
    return '';
  }

  isUserLoggedIn(): boolean {
    /*this.loadToken();
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
    }*/
    return true;
  }

  checkReset(code: string): Observable<CheckResetPasswordResponseDTO> {
    //return this.api.checkReset(code);
    return null;
  }

  resetPassword(email: string): Observable<any> {
    //return this.api.resetPassword(email);
    return null;
  }

  finalizeReset(dto: PasswordResetDTO): Observable<InterviewUserDTO> {
    //return this.api.finalizeReset(dto);
    return null;
  }

  sendUsernameEmail(email: string): Observable<any> {
    //return this.api.sendUsernameEmail(email);
    return null;
  }

  postRecaptcha(obj: GoogleRequestDTO): Observable<any> {
    //return this.api.postRecaptcha(obj);
    return null;
  }

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
   // return this.api.login(user);
    return null;
  }

  register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    //return this.api.register(user);
    return null;
  }

  confirmEmail(id: string): Observable<InterviewUserDTO> {
    //return this.api.confirmEmail(id);
    return null;
  }
}
