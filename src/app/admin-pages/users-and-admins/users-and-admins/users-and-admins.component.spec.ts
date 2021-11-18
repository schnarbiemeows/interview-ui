import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersAndAdminsComponent } from './users-and-admins.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {InterviewUserServiceStub} from "../../../../testing/interview-user-service-stub";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {InterviewUserService} from "../../../services/interviewuser/interview-user.service";

describe('UsersAndAdminsComponent', () => {
  let component: UsersAndAdminsComponent;
  let fixture: ComponentFixture<UsersAndAdminsComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let interviewUserService: InterviewUserServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsComponent ],
      providers: [HttpTestingController,
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: InterviewUserService, useClass: InterviewUserServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) as AuthenticationServiceStub;
    interviewUserService = TestBed.inject(InterviewUserService) as InterviewUserServiceStub;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
