import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {HttpTestingController} from "@angular/common/http/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormsModule} from "@angular/forms";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
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
    expect(component).toBeTruthy();
  });
});
