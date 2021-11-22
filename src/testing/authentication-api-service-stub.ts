import {environment} from "../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {Observable} from "rxjs";
import {CheckPasswordResetResponseDTO} from "../app/models/CheckPasswordResetResponseDTO";
import {PasswordResetDTO} from "../app/models/PasswordResetDTO";
import {GoogleRequestDTO} from "../app/models/GoogleRequestDTO";
import {Role} from "../app/enum/role.enum";
import {of} from "rxjs/observable/of";

export class AuthenticationApiServiceStub {
  testUser:InterviewUserDTO = {
    userId: 0,
    authorizations:[],
    emailAddr: 'emailAddrUser',
    firstName: 'firstNameUser',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lastNameUser',
    password: 'passwordUser',
    profileImage: 'profileImageUser',
    roles: Role.USER,
    userIdentifier: 'XXXZZZ',
    userName: 'userNameUser'
  };
  host = null;
  token: string;
  loggedInUsername: string;
  jwtHelper = new JwtHelperService();
  loginURL : string = null;
  registerURL : string = null;
  confirmEmailURL : string = null;
  resetPasswordURL : string = null;
  checkResetURL : string = null;
  finalizeResetURL : string = null;
  sendUsernameEmailURL : string = null;
  googleURL : string = null;

  public login(user: InterviewUserDTO): Observable<HttpResponse<InterviewUserDTO>> {
    let response = new HttpResponse<InterviewUserDTO>({ status : 200, body : this.testUser });
    return of(response);
  }

  register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    return of(this.testUser);
  }

  confirmEmail(id: string): Observable<InterviewUserDTO> {
    return of(this.testUser);
  }

  resetPassword(email: string): Observable<any> {
    return of("password reset");
  }

  checkReset(code: string): Observable<CheckPasswordResetResponseDTO> {
    const dto: CheckPasswordResetResponseDTO = new CheckPasswordResetResponseDTO(true,"email","unique");
    return of(dto);
  }

  finalizeReset(dto: PasswordResetDTO): Observable<InterviewUserDTO> {
    return of(this.testUser);
  }

  sendUsernameEmail(email: string): Observable<any> {
    return of("email sent");
  }

  postRecaptcha(obj: GoogleRequestDTO): Observable<any> {
    return of(obj);
  }

  logOut(): void {

  }

  saveToken(token: string): void {

  }

  addUserToLocalCache(user: InterviewUserDTO): void {

  }

  getUserFromLocalCache(): InterviewUserDTO {
    return this.testUser;
  }

  loadToken(): void {

  }

  getToken(): string {
    return "token";
  }

  isUserLoggedIn(): boolean {
    return true;
  }
}
