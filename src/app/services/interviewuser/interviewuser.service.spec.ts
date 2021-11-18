import { TestBed } from '@angular/core/testing';

import { InterviewUserService } from './interview-user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('InterviewuserService', () => {
  let service: InterviewUserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InterviewUserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
