import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailComponent } from './confirm-email.component';
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HttpTestingController} from "@angular/common/http/testing";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [ ConfirmEmailComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
