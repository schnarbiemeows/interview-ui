import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {Observable} from "rxjs";
import {CheckPasswordResetResponseDTO} from "../app/models/CheckPasswordResetResponseDTO";
import {PasswordResetDTO} from "../app/models/PasswordResetDTO";
import {GoogleRequestDTO} from "../app/models/GoogleRequestDTO";
import {HttpResponse} from "@angular/common/http";
import {Role} from "../app/enum/role.enum";
import {of} from "rxjs/observable/of";

export class AuthenticationServiceStub {


  public logOut(): void {
    /*this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');*/
  }

  public saveToken(token: string): void {
    /*this.token = token;
    localStorage.setItem('token', token);*/
  }

  public addUserToLocalCache(user: InterviewUserDTO): void {
    //localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): InterviewUserDTO {
    const dto:InterviewUserDTO = {
      userId: 1,
      authorizations:[],
      emailAddr: 'emailAddr',
      firstName: 'firstName',
      userActive: true,
      userNotLocked: true,
      joinDate: null,
      lastLoginDate: null,
      lastLoginDateDisplay: null,
      lastName: 'lastName',
      password: 'password',
      profileImage: 'profileImage',
      roles: Role.USER,
      userIdentifier: 'userIdentifier',
      userName: 'userName'
    };
    return dto;
  }

  public loadToken(): void {
    //this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    //return this.token;
    return '';
  }

  public isUserLoggedIn(): boolean {
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

  public checkReset(code: string): Observable<CheckPasswordResetResponseDTO> {
    return of(new CheckPasswordResetResponseDTO(true,"email","unique"));
  }

  public resetPassword(email: string): Observable<any> {
    return of("password reset");
  }

  public finalizeReset(dto: PasswordResetDTO): Observable<InterviewUserDTO> {
    return of(dto);
  }

  public sendUsernameEmail(email: string): Observable<any> {
    return of("email sent");
  }

  public postRecaptcha(obj: GoogleRequestDTO): Observable<any> {
    return of(obj);
  }

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
    return of(null);
  }
  public register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    const dto:InterviewUserDTO = {
      userId: 1,
      authorizations:[],
      emailAddr: 'emailAddr',
      firstName: 'firstName',
      userActive: true,
      userNotLocked: true,
      joinDate: null,
      lastLoginDate: null,
      lastLoginDateDisplay: null,
      lastName: 'lastName',
      password: 'password',
      profileImage: 'profileImage',
      roles: Role.USER,
      userIdentifier: 'userIdentifier',
      userName: 'userName'
    };
    return of(dto);
  }

  public confirmEmail(id: string): Observable<InterviewUserDTO> {
    const dto:InterviewUserDTO = {
      userId: 1,
      authorizations:[],
      emailAddr: 'emailAddr',
      firstName: 'firstName',
      userActive: true,
      userNotLocked: true,
      joinDate: null,
      lastLoginDate: null,
      lastLoginDateDisplay: null,
      lastName: 'lastName',
      password: 'password',
      profileImage: 'profileImage',
      roles: Role.USER,
      userIdentifier: 'userIdentifier',
      userName: 'userName'
    };
    return of(dto);
  }
}
