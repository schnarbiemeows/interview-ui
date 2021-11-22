import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import {Subscription} from "rxjs";
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {QuestionLevelApiServiceStub} from "../../../testing/question-level-api-service-stub";
import {AuthenticationApiService} from "../../api/authentication-api/authentication-api.service";
import {AuthenticationApiServiceStub} from "../../../testing/authentication-api-service-stub";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let susbscriptions: Subscription[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService,
        { provide: AuthenticationApiService, useClass: AuthenticationApiServiceStub}]
    });
    service = TestBed.inject(AuthenticationService);
  });
  afterEach(() => {
    susbscriptions.forEach(sub => sub.unsubscribe());
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
