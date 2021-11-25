import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {FormsModule} from "@angular/Forms";
import {PasswordResetDTO} from "../../models/PasswordResetDTO";

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  const passwordResetDto:PasswordResetDTO = {
    password : "password",
    uniqueId : "uniqueId",
    emailAddress : "emailAddress"
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule , FormsModule],
      declarations: [ ForgotPasswordComponent ],
      providers: [
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.uniqueId).toEqual("unique");
    expect(component.email).toEqual("email");
    expect(component.showErrorMsg).toBeFalse();
    expect(component.showLogin).toBeFalse();
    expect(component.showResetForm).toBeTrue();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.showResendBtn).toBeFalse();
    expect(component.resetForm).toBeTruthy();
    component.code = "NOT_FOUND";
    component.ngOnInit();
    expect(component.email).toEqual("email");
    expect(component.errorMsg).toEqual("We're sorry, but the password reset link that you clicked has expired, would you like to try again?");
    expect(component.showErrorMsg).toBeTrue();
    expect(component.showLogin).toBeFalse();
    expect(component.showResetForm).toBeFalse();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.showResendBtn).toBeTrue();
    component.code = "NO_EMAIL";
    component.ngOnInit();
    expect(component.errorMsg).toEqual("something went wrong, please click the link below to return to the login page and try again");
    expect(component.showErrorMsg).toBeTrue();
    expect(component.showLogin).toBeTrue();
    expect(component.showResetForm).toBeFalse();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.showResendBtn).toBeFalse();
  });
  it('should showAnErrorMessage', () => {
    component.showAnErrorMessage();
    expect(component.showErrorMsg).toBeTrue();
    expect(component.showLogin).toBeFalse();
    expect(component.showResetForm).toBeFalse();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.showResendBtn).toBeFalse();
  });
  it('should showTheResetForm', () => {
    component.showTheResetForm();
    expect(component.showErrorMsg).toBeFalse();
    expect(component.showLogin).toBeFalse();
    expect(component.showResetForm).toBeTrue();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.showResendBtn).toBeFalse();
    expect(component.resetForm).toBeTruthy();
  });

  it('should resendPassword', () => {
    component.resendPassword();
    expect(component.showErrorMsg).toBeFalse();
    expect(component.showLogin).toBeFalse();
    expect(component.showResetForm).toBeFalse();
    expect(component.showSuccessMessage).toBeTrue();
    expect(component.showResendBtn).toBeFalse();
    expect(component.successMsg).toEqual("A password email has been sent to the email address provided");
  });
  it('should onSubmitPasswordChange', () => {
    component.onSubmitPasswordChange(passwordResetDto);
    expect(component.showErrorMsg).toBeFalse();
    expect(component.showLogin).toBeTrue();
    expect(component.showResetForm).toBeFalse();
    expect(component.showSuccessMessage).toBeTrue();
    expect(component.showResendBtn).toBeFalse();
    expect(component.successMsg).toEqual("Your password has been reset successfully");
  });
  it('should displayMainPage', () => {
    component.displayMainPage();
    expect(component).toBeTruthy();
  });
  it('should displayLogin', () => {
    component.displayLogin();
    expect(component).toBeTruthy();
  });
});
