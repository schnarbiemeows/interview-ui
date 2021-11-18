import { TestBed } from '@angular/core/testing';
import { QuestionAndAnswersService } from './question-and-answers.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('QuestionAndAnswersService', () => {
  let service: QuestionAndAnswersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionAndAnswersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
