import { TestBed } from '@angular/core/testing';
import { InterviewUserService } from './interview-user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {InterviewUserApiService} from "../../api/interview-user-api/interview-user-api.service";
import {InterviewUserApiServiceStub} from "../../../testing/interview-user-api-service-stub";
import {Subscription} from "rxjs";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {Role} from "../../enum/role.enum";
import {InterviewUserDTOWrapper} from "../../models/InterviewUserDTOWrapper";

describe('InterviewuserService', () => {
  let service: InterviewUserService;
  let httpTestingController: HttpTestingController;
  let susbscriptions: Subscription[] = [];
  let loaded: boolean;
  let addMode:boolean;
  let editMode:boolean;
  let showForm: boolean;
  let paginationDisabled: boolean;
  let interviewuserlist: InterviewUserDTO[];
  const testUser:InterviewUserDTO = {
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
  let wrapper:InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
  wrapper.fromDto(testUser);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      { provide: InterviewUserApiService, useClass: InterviewUserApiServiceStub}]
    });
    service = TestBed.inject(InterviewUserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should reload', () => {
    service.reload();
    susbscriptions.push(
      service.loaded$.subscribe((data) => {
        loaded = data;
        expect(loaded).toBeTrue();
      })
    );
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeFalse();
      })
    );
    susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeFalse();
      })
    );
    susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeFalse();
      })
    );
    susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeFalse();
      })
    );
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(3);
      })
    );
  });
  it('should searchInterviewUser', () => {
    // should do this twice, once that finds matches, and once that does not
    service.reload();
    service.searchInterviewUser("nomatch");
    let count = 0;
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        if(count==0) {
          expect(interviewuserlist.length).toEqual(3);
          count = 1;
        } else {
          expect(interviewuserlist.length).toEqual(1);
        }
      })
    );
    service.searchInterviewUser("firstNameUser");
  });
  it('should initiateAdd', () => {
    service.reload();
    const newUser = service.initiateAdd();
    expect(newUser).toBeTruthy();
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeTrue();
      })
    ); susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeTrue();
      })
    ); susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeTrue();
      })
    ); susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeFalse();
      })
    );
  });

  it('should editItem', () => {
    service.reload();
    const newUser = service.editItem(0);
    expect(newUser).toBeTruthy();
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeTrue();
      })
    ); susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeTrue();
      })
    ); susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeFalse();
      })
    ); susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeTrue();
      })
    );
  });

  it('should deleteItem', () => {
    service.reload();
    let firstCallMade:boolean = false;
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        if(firstCallMade) {
          expect(interviewuserlist.length).toEqual(2);
        } else {
          expect(interviewuserlist.length).toEqual(3);
          firstCallMade=true;
        }
      })
    );
    service.deleteItem(0);
  });
  it('should saveResults()', () => {
    // should do this twice, once for add, and once for edit
    service.reload();
    service.initiateAdd();
    service.saveResults(wrapper);
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(4);
      })
    );
    service.editItem(0);
    service.saveResults(wrapper);
  });
  it('should showAllUsers', () => {
    service.reload();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(3);
      })
    );
  });
  it('should showOnlyUsers', () => {
    service.reload();
    service.showOnlyUsers();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(2);
      })
    );
  });
  it('should showOnlyAdmins', () => {
    service.reload();
    service.showOnlyAdmins();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(1);
      })
    );
  });
  it('should showBasicUsers', () => {
    service.reload();
    service.showBasicUsers();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(1);
      })
    );
  });
  it('should showAdvUsers', () => {
    service.reload();
    service.showAdvUsers();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(1);
      })
    );
  });
  it('should showPremiumUsers', () => {
    service.reload();
    service.showPremiumUsers();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(0);
      })
    );
  });
  it('should showAllUsers', () => {
    service.reload();
    service.showAllUsers();
    susbscriptions.push(
      service.interviewuserlist$.subscribe((data) => {
        interviewuserlist = data;
        expect(interviewuserlist.length).toEqual(3);
      })
    );
  });
  it('should destroy()', () => {
    service.destroy();
    expect(service).toBeTruthy();
  });
});
