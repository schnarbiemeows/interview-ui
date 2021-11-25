import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {Observable} from "rxjs";
import {CheckPasswordResetResponseDTO} from "../app/models/CheckPasswordResetResponseDTO";
import {PasswordResetDTO} from "../app/models/PasswordResetDTO";
import {GoogleRequestDTO} from "../app/models/GoogleRequestDTO";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {Role} from "../app/enum/role.enum";
import {of} from "rxjs/observable/of";
import {HeaderType} from "../app/enum/header-type.enum";

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

export class AuthenticationServiceStub {

  public logOut(): void {

  }

  public saveToken(token: string): void {

  }

  public addUserToLocalCache(user: InterviewUserDTO): void {

  }

  getUserFromLocalCache(): InterviewUserDTO {
    return dto;
  }

  public loadToken(): void {

  }

  public getToken(): string {
    return 'token';
  }

  public isUserLoggedIn(): boolean {
    return true;
  }

  public checkReset(code: string): Observable<CheckPasswordResetResponseDTO> {
    if(code=="NOT_FOUND") {
      return of(new CheckPasswordResetResponseDTO(false,"email","unique"));
    } else if(code=="NO_EMAIL") {
      return of(new CheckPasswordResetResponseDTO(false,null,"unique"));
    } else {
      return of(new CheckPasswordResetResponseDTO(true,"email","unique"));
    }
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
    const headers: HttpHeaders = new HttpHeaders();
    headers.set(HeaderType.JWT_TOKEN,"token");
    let response = new HttpResponse<InterviewUserDTO>({ status : 200, headers: headers , body : dto });
    return of(response);
  }
  public register(user: InterviewUserDTO): Observable<InterviewUserDTO> {
    return of(dto);
  }

  public confirmEmail(id: string): Observable<InterviewUserDTO> {
    return of(dto);
  }
}
