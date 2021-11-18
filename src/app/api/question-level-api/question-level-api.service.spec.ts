import { TestBed } from '@angular/core/testing';
import { QuestionLevelApiService } from './question-level-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('QuestionLevelApiService', () => {
  let service: QuestionLevelApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionLevelApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
