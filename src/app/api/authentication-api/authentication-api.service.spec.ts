import {fakeAsync, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationApiService } from './authentication-api.service';
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {Role} from "../../enum/role.enum";
import configData from '../../../assets/data/test-config.json';


describe('AuthenticationApiService', () => {
  let service: AuthenticationApiService;
  let httpTestingController: HttpTestingController;
  let properties = new Map();
  const host = environment.apiUrl;
  const loginURL: string = `${host}/interviewuser/login`;
  const registerURL: string = `${host}/interviewuser/register`;
  const confirmEmailURL: string = `${host}/interviewuser/confirmemail`;
  const resetPasswordURL: string = `${host}/interviewuser/forgotpassword`;
  const checkResetURL: string = `${host}/interviewuser/checkreset`;
  const finalizeResetURL: string = `${host}/interviewuser/finalizepassword`;
  const sendUsernameEmailURL: string = `${host}/interviewuser/forgotusername`;
  const googleURL : string = `${host}/recaptcha/post`;
  let dto:InterviewUserDTO = {
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
  let dtoTemp:InterviewUserDTO = {
    userId: 1,
    authorizations:[],
    emailAddr: 'eee',
    firstName: 'fff',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lll',
    password: 'ppp',
    profileImage: 'profileImage',
    roles: Role.USER,
    userIdentifier: 'ui',
    userName: 'un'
  };
  let store = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationApiService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationApiService);

  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call login',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
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
            roles: '',
            userIdentifier: 'userIdentifier',
            userName: 'userName'
          }
        ]
      };
      service.login(dto).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(loginURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call register',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
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
            roles: '',
            userIdentifier: 'userIdentifier',
            userName: 'userName'
          }
        ]
      };
      service.register(dto).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(registerURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call confirmEmail',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
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
            roles: '',
            userIdentifier: 'userIdentifier',
            userName: 'userName'
          }
        ]
      };
      service.confirmEmail("any string").subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(confirmEmailURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call resetPassword',
    fakeAsync(() => {
      let response = {
        results:
          {
            message : "An email with a new password was sent to: email_addr"
          }

      };
      service.resetPassword("email_addr").subscribe((results) => {
        expect(response.results.message).toBe("An email with a new password was sent to: email_addr");
      });
      const req = httpTestingController.expectOne(resetPasswordURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call checkReset',
    fakeAsync(() => {
      let response = {
        results:
          {
            foundRecord : true,
            emailAddress : "email_addr",
            uniqueId : "XXX"
          }
      };
      service.checkReset("code").subscribe((results) => {
        expect(response.results.foundRecord).toBeTrue();
        expect(response.results.emailAddress).toBe("email_addr");
        expect(response.results.uniqueId).toBe("XXX");
      });
      const req = httpTestingController.expectOne(checkResetURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call finalizeReset',
    fakeAsync(() => {
      let response = {
        results:
          {
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
            roles: '',
            userIdentifier: 'userIdentifier',
            userName: 'userName'
          }
      };
      const passwordReset: PasswordResetDTO = {
        password : 'password',
        uniqueId : 'uniqueId',
        emailAddress : 'emailAddress'
      }
      service.finalizeReset(passwordReset).subscribe((results) => {
        expect(response.results.userId).toBe(1);
        expect(response.results.emailAddr).toBe("emailAddr");
        expect(response.results.firstName).toBe("firstName");
        expect(response.results.lastName).toBe("lastName");
        expect(response.results.userIdentifier).toBe("userIdentifier");
        expect(response.results.userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(finalizeResetURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call sendUsernameEmail',
    fakeAsync(() => {
      let response = {
        results:
          {}
      };
      service.sendUsernameEmail("email").subscribe((results) => {
        expect(response.results).toBeTruthy();
      });
      const req = httpTestingController.expectOne(sendUsernameEmailURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call postRecaptcha',
    fakeAsync(() => {
      let response = {
        results:
          {
            secret : "XXX",
            response : "YYY"
          }
      };
      const googleObj = new GoogleRequestDTO("response");
      service.postRecaptcha(googleObj).subscribe((results) => {
        expect(response.results.secret).toEqual("XXX");
        expect(response.results.response).toEqual("YYY");
      });
      const req = httpTestingController.expectOne(googleURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should do 7 steps: logOut(),saveToken(),addUserToLocalCache(),' +
    'getUserFromLocalCache(),loadToken(),getToken(),isUserLoggedIn()', () => {
    populateDataMap(JSON.stringify(configData));
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
    service.addUserToLocalCache(dtoTemp);
    user = service.getUserFromLocalCache();
    expect(user).toBeTruthy();
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
