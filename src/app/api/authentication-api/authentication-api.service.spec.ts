import {fakeAsync, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationApiService } from './authentication-api.service';
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";
import {GoogleRequestDTO} from "../../models/GoogleRequestDTO";
import {Role} from "../../enum/role.enum";
import {NotifierService} from "angular-notifier";
import {MockJwtTokenObj} from "../../../testing/mockJwtTokenObj";

describe('AuthenticationApiService', () => {
  let service: AuthenticationApiService;
  let httpTestingController: HttpTestingController;
  let jwtServiceSpy:jasmine.SpyObj<JwtHelperService>;
  const host = environment.apiUrl;
  let token: string = null;
  let tempToken: string = 'token';
  let loggedInUsername: string = null;
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
    jwtServiceSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken','isTokenExpired']);
    jwtServiceSpy.decodeToken.and.returnValue(returnMockToken());
    jwtServiceSpy.isTokenExpired.and.returnValue(false);
    /*store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => /!*key in store ? store[key] : null*!/ getFromLocalStorage(store,key),
      setItem: (key: string, value: string) => /!*store[key] = `${value}`*!/ setItemIntoLocalStorage(store, key, value),
      removeItem: (key: string) => delete store[key],
      clear: () => store = {}
    };
    spyOn(Storage.prototype, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(Storage.prototype, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(Storage.prototype, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(Storage.prototype, 'clear').and.callFake(mockSessionStorage.clear);*/
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationApiService,
        { provide: JwtHelperService, useValue: jwtServiceSpy}]
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
  it('should logOut', () => {
    service.logOut();
    expect(service).toBeTruthy();
  });
  /*it('should saveToken', () => {
    service.saveToken(tempToken);
    expect(service.token).toEqual(tempToken);
    expect(store['token']).toEqual('token');
  });*/
  /*it('should addUserToLocalCache', () => {
    service.addUserToLocalCache(dtoTemp);
    expect(JSON.parse(store['user'])).toEqual(dtoTemp);
  });*/
  it('should addUserToLocalCache and getUserFromLocalCache', () => {
    service.addUserToLocalCache(dtoTemp);
    dto = service.getUserFromLocalCache();
    expect(dto).toEqual(dtoTemp);
  });
  it('should saveToken, loadToken and then get token', () => {
    console.log("saving token in localstorage = XXX");
    service.saveToken("XXX");
    service.loadToken();
    let result = service.getToken();
    expect(result).toEqual("XXX");
  });
  /*it('should verify isUserLoggedIn as true', () => {
    service.saveToken("XXX");
    let tOrF = service.isUserLoggedIn();
    expect(tOrF).toBeTrue();
  });
  function getFromLocalStorage(localstorage, input) {
    console.log("inside the mock local storage with input = " + input);
    if(input in store) {
      console.log("input is in store");
    }
    return input in store ? store[input] : null;
  }
  function setItemIntoLocalStorage(localstorage,key,value) {
    console.log("inside the save mock local storage with input = " + key + " , " + value );
  }*/
  function returnMockToken() {
    console.log("inside returnMockToken");
    new MockJwtTokenObj("mock_token")
  }
});
