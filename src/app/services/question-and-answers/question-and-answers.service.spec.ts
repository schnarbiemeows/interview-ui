import { TestBed } from '@angular/core/testing';
import { QuestionAndAnswersService } from './question-and-answers.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('QuestionAndAnswersService', () => {
  let service: QuestionAndAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionAndAnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
