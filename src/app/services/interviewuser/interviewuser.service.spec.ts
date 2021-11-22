import { TestBed } from '@angular/core/testing';

import { InterviewUserService } from './interview-user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NotificationService} from "../notification/notification.service";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {InterviewUserApiService} from "../../api/interview-user-api/interview-user-api.service";
import {InterviewUserApiServiceStub} from "../../../testing/interview-user-api-service-stub";

describe('InterviewuserService', () => {
  let service: InterviewUserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      { provide: InterviewUserApiService, useClass: InterviewUserApiServiceStub}]
    });
    service = TestBed.inject(InterviewUserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should reload', () => {
    service.reload();
    expect(service).toBeTruthy();
  });
  it('should searchInterviewUser', () => {
    service.reload();
    service.searchInterviewUser("XXX");
    expect(service).toBeTruthy();
  });
  it('should initiateAdd', () => {
    const newUser = service.initiateAdd();
    expect(newUser).toBeTruthy();
  });

  it('should editItem', () => {
    const newUser = service.editItem(0);
    expect(newUser).toBeTruthy();
  });

  it('should deleteItem', () => {
    service.deleteItem(0);
    expect(service).toBeTruthy();
  });
});
