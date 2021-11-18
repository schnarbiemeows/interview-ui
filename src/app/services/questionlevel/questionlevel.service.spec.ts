import { TestBed } from '@angular/core/testing';

import { QuestionLevelService } from './question-level.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('QuestionlevelService', () => {
  let service: QuestionLevelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionLevelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
