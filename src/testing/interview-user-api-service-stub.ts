import {Observable} from "rxjs/Observable";
import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {InterviewUserDTOWrapper} from "../app/models/InterviewUserDTOWrapper";
import {ResponseMessage} from "../app/models/ResponseMessage";
import {CustomHttpRespone} from "../app/models/custom-http-response";
import {Role} from "../app/enum/role.enum";
import {of} from "rxjs/observable/of";

export class InterviewUserApiServiceStub {
  testUsers:InterviewUserDTO[] = [{
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
  },{
    userId: 1,
    authorizations:[],
    emailAddr: 'emailAddrAdv',
    firstName: 'firstNameAdv',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lastNameAdv',
    password: 'passwordAdv',
    profileImage: 'profileImageAdv',
    roles: Role.ADV_USER,
    userIdentifier: 'XXXYYY',
    userName: 'userNameAdv'
  },{
    userId: 2,
    authorizations:[],
    emailAddr: 'emailAddrAdmin',
    firstName: 'firstNameAdmin',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lastNameAdmin',
    password: 'passwordAdmin',
    profileImage: 'profileImageAdmin',
    roles: Role.ADMIN,
    userIdentifier: 'YYYZZZ',
    userName: 'userNameAdmin'
  }];
  getAllInterviewUser(): Observable<InterviewUserDTO[]> {
    return of(this.testUsers);
  }
  findInterviewUserById(id: number): Observable<InterviewUserDTO> {
    return of(this.testUsers[id]);
  }
  createInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    data.userId = this.testUsers.length+1;
    this.testUsers.push(data);
    return of(data);
  }
  updateInterviewUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    let myIndex:number = this.testUsers.findIndex(rec => rec.userId == data.userId);
    this.testUsers[myIndex] = data;
    return of(data);
  }

  updateUserByUser(data: InterviewUserDTOWrapper): Observable<InterviewUserDTO> {
    let myIndex:number = this.testUsers.findIndex(rec => rec.userId == data.userId);
    this.testUsers[myIndex] = data;
    return of(data);
  }
  deleteInterviewUser(username: string): Observable<ResponseMessage> {
    this.testUsers = this.testUsers.filter(rec => rec.userName != username);
    return of(new ResponseMessage("successfully deleted"));
  }

  /*forgotPassword(email: string): Observable<CustomHttpRespone> {
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
    /!*if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }*!/
    return null;
  }*/
}
