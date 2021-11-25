import {fakeAsync, TestBed} from '@angular/core/testing';
import { InterviewUserApiService } from './interview-user-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {InterviewUserDTOWrapper} from "../../models/InterviewUserDTOWrapper";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";


describe('InterviewUserApiService', () => {
  let service: InterviewUserApiService;
  let httpTestingController: HttpTestingController;
  const host = environment.apiUrl;
  const getAllInterviewUserURL = `${host}/interviewuser/all`;
  const findInterviewUserByIdURL = `${host}/interviewuser/findById/`;
  const createInterviewUserURL = `${host}/interviewuser/create`;
  const updateInterviewUserURL = `${host}/interviewuser/update`;
  const updateUserByUserURL = `${host}/interviewuser/updateuserbyuser`;
  const deleteInterviewUserURL = `${host}/interviewuser/delete/`;
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
    roles: '',
    userIdentifier: 'userIdentifier',
    userName: 'userName'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterviewUserApiService]
    });
    service = TestBed.inject(InterviewUserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllInterviewUser',
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
      service.getAllInterviewUser().subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(getAllInterviewUserURL);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call findInterviewUserById',
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
      service.findInterviewUserById(1).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const actualUrl = findInterviewUserByIdURL+`1`
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call createInterviewUser',
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
      const interviewUserDTOWrapper:InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
      interviewUserDTOWrapper.fromDto(dto);
      service.createInterviewUser(interviewUserDTOWrapper).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(createInterviewUserURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateInterviewUser',
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
      const interviewUserDTOWrapper:InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
      interviewUserDTOWrapper.fromDto(dto);
      service.updateInterviewUser(interviewUserDTOWrapper).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(updateInterviewUserURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateUserByUser',
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
      const interviewUserDTOWrapper:InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
      interviewUserDTOWrapper.fromDto(dto);
      service.updateUserByUser(interviewUserDTOWrapper).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].userId).toBe(1);
        expect(response.results[0].emailAddr).toBe("emailAddr");
        expect(response.results[0].firstName).toBe("firstName");
        expect(response.results[0].lastName).toBe("lastName");
        expect(response.results[0].userIdentifier).toBe("userIdentifier");
        expect(response.results[0].userName).toBe("userName");
      });
      const req = httpTestingController.expectOne(updateUserByUserURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call deleteInterviewUser',
    fakeAsync(() => {
      let response = {
        results:
          {
            message: "successfully deleted"
          }
      };
      const actualUrl = deleteInterviewUserURL+`userName`
      service.deleteInterviewUser("userName").subscribe((results) => {
        expect(response.results.message).toBe("successfully deleted");
      });
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("DELETE");
      req.flush(response);
    })
  );
});
