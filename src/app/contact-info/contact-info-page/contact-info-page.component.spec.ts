import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ChangePasswordForm, ChangeUserInfoForm, ContactInfoPageComponent} from './contact-info-page.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {InterviewUserApiServiceStub} from "../../../testing/interview-user-api-service-stub";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {InterviewUserApiService} from "../../api/interview-user-api/interview-user-api.service";
import {SharedModule} from "../../shared/shared.module";

describe('ContactInfoPageComponent', () => {
  let component: ContactInfoPageComponent;
  let fixture: ComponentFixture<ContactInfoPageComponent>;
  let httpTestingController: HttpTestingController;
  //let authStub: AuthenticationServiceStub;
  const changePasswordForm:ChangePasswordForm = {
    oldPassword : "oldPassword",
    newPassword : "newPassword",
    newPasswordConfirm : "newPassword"
  };
  const changeInfoForm:ChangeUserInfoForm = {
    newEmailAddr : "newEmailAddr",
    newFirstName : "newFirstName",
    newLastName : "newLastName",
    newUserName : "newUserName"
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [ ContactInfoPageComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: InterviewUserApiService, useClass: InterviewUserApiServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    //authStub = TestBed.inject(AuthenticationServiceStub);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.interviewuserwrapper.userName).toBeTruthy();
    expect(component.showChangePwd).toBeFalse();
    expect(component.showChangeInfo).toBeFalse();
    expect(component.showUserInfo).toBeTrue();
    expect(component.loaded).toBeTrue();
  });
  it('should changePassword', () => {
    component.changePassword();
    expect(component.showUserInfo).toBeFalse();
    expect(component.showChangePwd).toBeTrue();
    expect(component.showChangeInfo).toBeFalse();
    expect(component.changePasswordForm).toBeTruthy();
  });
  it('should changeInfo', () => {
    component.changeInfo();
    expect(component.showUserInfo).toBeFalse();
    expect(component.showChangePwd).toBeFalse();
    expect(component.showChangeInfo).toBeTrue();
    expect(component.changeUserInfoForm).toBeTruthy();
  });
  it('should onSubmitInfoChange', () => {
    component.changeUserInfoForm = changeInfoForm;
    component.onSubmitInfoChange();
    expect(component.interviewuserwrapper.newUserName).toEqual("userName");
    expect(component.interviewuserwrapper.newEmailAddr).toEqual("emailAddr");
    expect(component.interviewuserwrapper.newFirstName).toEqual("firstName");
    expect(component.interviewuserwrapper.newLastName).toEqual("lastName");
  });
  it('should onSubmitPasswordChange', () => {
    component.changePasswordForm = changePasswordForm;
    component.onSubmitPasswordChange();
    expect(component.interviewuserwrapper.newPassword).toEqual("newPassword");
    expect(component.interviewuserwrapper.password).toEqual("oldPassword");
  });
});
