import { TestBed } from '@angular/core/testing';

import { InterviewUserApiService } from './interview-user-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('InterviewUserApiService', () => {
  let service: InterviewUserApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InterviewUserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
