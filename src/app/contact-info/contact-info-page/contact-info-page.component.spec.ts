import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactInfoPageComponent } from './contact-info-page.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {InterviewUserApiServiceStub} from "../../../testing/interview-user-api-service-stub";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {InterviewUserApiService} from "../../api/interview-user-api/interview-user-api.service";

describe('ContactInfoPageComponent', () => {
  let component: ContactInfoPageComponent;
  let fixture: ComponentFixture<ContactInfoPageComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let notificationService: NotificationServiceStub;
  let interviewUserApiService: InterviewUserApiServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ContactInfoPageComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: InterviewUserApiService, useClass: InterviewUserApiServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) as AuthenticationServiceStub;
    notificationService = TestBed.inject(NotificationService) as NotificationServiceStub;
    interviewUserApiService = TestBed.inject(InterviewUserApiService) as InterviewUserApiServiceStub;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
