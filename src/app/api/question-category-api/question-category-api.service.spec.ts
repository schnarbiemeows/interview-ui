import { TestBed } from '@angular/core/testing';
import { QuestionCategoryApiService } from './question-category-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('QuestionCategoryApiService', () => {
  let service: QuestionCategoryApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionCategoryApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
