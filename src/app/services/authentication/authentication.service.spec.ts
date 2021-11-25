import { TestBed } from '@angular/core/testing';
import configData from '../../../assets/data/test-config.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import {Subscription} from "rxjs";
import {AuthenticationApiService} from "../../api/authentication-api/authentication-api.service";
import {AuthenticationApiServiceStub} from "../../../testing/authentication-api-service-stub";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {Role} from "../../enum/role.enum";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";
import {CheckPasswordResetResponseDTO} from "../../models/CheckPasswordResetResponseDTO";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let susbscriptions: Subscription[] = [];
  let properties = new Map();
  let testUser:InterviewUserDTO = {
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
  let passwordResetDTO: PasswordResetDTO = {
    password : 'password',
    uniqueId :'uniqueId',
    emailAddress :'emailAddress'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService,
        { provide: AuthenticationApiService, useClass: AuthenticationApiServiceStub}]
    });
    service = TestBed.inject(AuthenticationService);
    populateDataMap(JSON.stringify(configData));
  });
  afterEach(() => {
    susbscriptions.forEach(sub => sub.unsubscribe());
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should do 7 steps: logOut(),saveToken(),addUserToLocalCache(),' +
    'getUserFromLocalCache(),loadToken(),getToken(),isUserLoggedIn()', () => {
    // first, log out just to clear the local storage
    service.logOut();
    // next check isUserLoggedIn, it should return false;
    let tOrF:boolean = service.isUserLoggedIn();
    expect(tOrF).toBeFalse();
    // also, there should be no user in the local cache
    let user:InterviewUserDTO = service.getUserFromLocalCache();
    expect(user).toBeFalsy();
    // now saveToken, then loadToken, and then getToken, we should retrieve a token
    const tokenInput = properties.get("testusertoken");
    service.saveToken(tokenInput);
    service.loadToken();
    const tokenOutput = service.getToken();
    expect(tokenOutput).toEqual(tokenInput);
    // now check again to make sure the user is logged in
    tOrF = service.isUserLoggedIn();
    expect(tOrF).toBeTrue();
    // add user to the cache and then check again to make sure they are there
    service.addUserToLocalCache(testUser);
    user = service.getUserFromLocalCache();
    expect(user).toBeTruthy();
  });
  it('should checkReset()', () => {
    susbscriptions.push(service.checkReset('any').subscribe(data => {
      const dto:CheckPasswordResetResponseDTO = data;
      expect(dto).toBeTruthy();
    }));
  });
  it('should resetPassword()', () => {
    susbscriptions.push(service.resetPassword('any').subscribe(data => {
      const results:string = data;
      expect(results).toEqual("password reset");
    }));
  });
  it('should finalizeReset()', () => {
    susbscriptions.push(service.finalizeReset(passwordResetDTO).subscribe(data => {
      const user:InterviewUserDTO = data;
      expect(user).toBeTruthy();
    }));
  });
  it('should sendUsernameEmail()', () => {
    susbscriptions.push(service.sendUsernameEmail('any').subscribe(data => {
      const results:string = data;
      expect(results).toEqual("email sent");
    }));
  });
  it('should postRecaptcha()', () => {
    susbscriptions.push(service.postRecaptcha(new GoogleRequestDTO('any')).subscribe(data => {
      const dto:GoogleRequestDTO = data;
      expect(dto).toBeTruthy();
    }));
  });
  it('should login()', () => {
    susbscriptions.push(service.login(testUser).subscribe(data => {
      const user:InterviewUserDTO = data.body;
      expect(user).toBeTruthy();
    }));
  });
  it('should register()', () => {
    susbscriptions.push(service.register(testUser).subscribe(data => {
      const user:InterviewUserDTO = data;
      expect(user).toBeTruthy();
    }));
  });
  it('should confirmEmail()', () => {
    susbscriptions.push(service.confirmEmail('any').subscribe(data => {
      const user:InterviewUserDTO = data;
      expect(user).toBeTruthy();
    }));
  });
  function populateDataMap(data: string) {
    let dataArray = data.replace("[","").replace("]","").split("},");
    for(let str of dataArray) {
      str = str.trim();
      if(!str.endsWith("}")) { str += "}"; }
      const jsonObject = JSON.parse(str);
      for (let element in jsonObject) {
        properties.set(element,jsonObject[element].toString());
      }
    }
  }
});
