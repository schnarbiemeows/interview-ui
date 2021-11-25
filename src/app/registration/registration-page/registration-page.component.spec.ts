import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HttpTestingController} from "@angular/common/http/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {SharedModule} from "../../shared/shared.module";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {Role} from "../../enum/role.enum";

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let httpTestingController: HttpTestingController;
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule, SharedModule],
      declarations: [ RegistrationPageComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should resolved', () => {
    component.resolved("any");
    expect(component.recaptchaValid).toBeTrue();
  });
  it('should onError', () => {
    component.onError(null);
    expect(component).toBeTruthy();
  });
  it('should onRegister', () => {
    component.onRegister(dto);
    expect(component).toBeTruthy();
  });
});
