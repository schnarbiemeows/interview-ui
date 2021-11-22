import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {RouterTestingModule} from "@angular/router/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {FormsModule} from "@angular/Forms";

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

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
  });
});
