import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {HttpTestingController} from "@angular/common/http/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormsModule} from "@angular/forms";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";
import {Role} from "../../enum/role.enum";
import {SharedModule} from "../../shared/shared.module";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let httpTestingController: HttpTestingController;
  //let authSpy: jasmine.SpyObj<AuthenticationService>;
  let throwError:boolean;
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
    /*authSpy = jasmine.createSpyObj('AuthenticationService',
      [
        'isUserLoggedIn',
        'login',
        'postRecaptcha',
        'resetPassword',
        'sendUsernameEmail'
      ]);
    authSpy.isUserLoggedIn.and.callFake(function() {
      if(throwError) return false;
      else return true;
    });
    authSpy.postRecaptcha.and.callFake(function() {
      if(throwError) return of(new HttpErrorResponse({status : 404}));
      else return of(new HttpResponse({status : 200, body : "OK"}));
    });
    authSpy.login.and.(function() {
      if(throwError) return of(new HttpErrorResponse({status : 404}));
      else {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set(HeaderType.JWT_TOKEN,"token");
        let response = new HttpResponse<InterviewUserDTO>({ status : 200, headers: headers , body : dto });
        return of(response);
      }
    });*/
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule],
      declarations: [ LoginPageComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    /*authSpy.isUserLoggedIn.and.returnValue(true);
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authSpy.isUserLoggedIn.and.returnValue(false);
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
    expect(component).toBeTruthy();
  });
  it('should resolved', () => {
    /*authSpy.postRecaptcha.and.callFake(function() {
      return of(new HttpResponse({status : 200, body : "OK"}));
    });*/
    component.resolved("any");
    expect(component.recaptchaValid).toBeTrue();
   /* const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404, statusText: 'Not Found'
    });
    authSpy.postRecaptcha.and.returnValue(of(errorResponse));
    component.resolved("any");
    expect(component.recaptchaValid).toBeFalse();*/
  });
  it('should onError', () => {
    component.onError(null);
    expect(component).toBeTruthy();
  });
  it('should onLogin', () => {
    component.onLogin(dto);
    expect(component).toBeTruthy();
    dto.password='';
    component.onLogin(dto);
    expect(component).toBeTruthy();
  });
  it('should onForgotPassword', () => {
    component.onForgotPassword();
    expect(component.didntGetEmailMsg).toEqual("");
    expect(component.email).toEqual("");
    expect(component.btnMsg).toEqual("Reset Password");
    expect(component.forgotPasswordFormInitiated).toBeTrue();
  });
  it('should onForgotUsername', () => {
    component.onForgotUsername();
    expect(component.didntGetEmailMsg).toEqual("");
    expect(component.email).toEqual("");
    expect(component.recoverUsernameMsg).toEqual("Recover Username");
    expect(component.btnMsg).toEqual("Send me my Username");
    expect(component.forgotUsernameFormInitiated).toBeTrue();
  });
  it('should resetPassword', () => {
    component.resetPassword();
    expect(component.forgotPasswordFormInitiated).toBeFalse();
    expect(component.didntGetEmailMsg).toEqual("Didn't get the email?");
    expect(component.btnMsg).toEqual("Resend Email");
  });
  it('should sendUsernameEmail', () => {
    component.sendUsernameEmail();
    expect(component.forgotPasswordFormInitiated).toBeFalse();
    expect(component.recoverUsernameMsg).toEqual(component.resendUsernameEmailMsg);
    expect(component.didntGetEmailMsg).toEqual("Didn't get the email?");
    expect(component.btnMsg).toEqual("Resend Email");
  });
});
