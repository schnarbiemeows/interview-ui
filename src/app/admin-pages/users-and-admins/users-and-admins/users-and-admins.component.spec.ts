import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersAndAdminsComponent } from './users-and-admins.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {InterviewUserServiceStub} from "../../../../testing/interview-user-service-stub";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {InterviewUserService} from "../../../services/interviewuser/interview-user.service";
import {InterviewUserDTOWrapper} from "../../../models/InterviewUserDTOWrapper";

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
    //interviewUserService = TestBed.inject(InterviewUserService) as InterviewUserServiceStub;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get isAdmin()', () => {
    let torf = component.isAdmin;
    expect(torf).toBeFalse();
  });
  it('should get isSuper()', () => {
    let torf = component.isSuper;
    expect(torf).toBeFalse();
  });
  it('should initialize a new object on initiateAdd()', () => {
    component.initiateAdd();
    expect(component.userItem).toBeTruthy();
  });
  it('should retrieve an object on editItem()', () => {
    component.editItem(0);
    expect(component.userItem).toBeTruthy();
  });
  it('should deleteItem()', () => {
    component.deleteItem(0);
    expect(component).toBeTruthy();
  });
  it('should search()', () => {
    component.search('value');
    expect(component).toBeTruthy();
  });
  it('test receiveFormCancel()', () => {
    component.receiveFormCancel();
    expect(component).toBeTruthy();
  });
  it('test receiveFormSaveAdd()', () => {
    let item = new InterviewUserDTOWrapper();
    component.receiveFormSaveAdd(item);
    expect(component).toBeTruthy();
  });
  it('test receiveFormSaveEdit()', () => {
    let item = new InterviewUserDTOWrapper();
    component.receiveFormSaveEdit(item);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(0)', () => {
    component.receiveFilterRequest(0);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(1)', () => {
    component.receiveFilterRequest(1);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(2)', () => {
    component.receiveFilterRequest(2);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(3)', () => {
    component.receiveFilterRequest(3);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(4)', () => {
    component.receiveFilterRequest(4);
    expect(component).toBeTruthy();
  });
  it('should receiveFilterRequest(5)', () => {
    component.receiveFilterRequest(5);
    expect(component).toBeTruthy();
  });
});
