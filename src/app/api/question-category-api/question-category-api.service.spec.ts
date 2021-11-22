import {fakeAsync, TestBed} from '@angular/core/testing';
import { QuestionCategoryApiService } from './question-category-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {QuestionCategoryDTO} from "../../models/QuestionCategoryDTO";

describe('QuestionCategoryApiService', () => {
  let service: QuestionCategoryApiService;
  let httpTestingController: HttpTestingController;
  const host = environment.apiUrl;
  const getAllQuestionCategoryURL = `${host}/questioncategory/all`;
  const findQuestionCategoryByIdURL = `${host}/questioncategory/findById/`;
  const createQuestionCategoryURL = `${host}/questioncategory/create`;
  const updateQuestionCategoryURL = `${host}/questioncategory/update`;
  const deleteQuestionCategoryURL = `${host}/questioncategory/delete/`;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionCategoryApiService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QuestionCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllQuestionCategory',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionCategoryId: 1,
            questionCategoryDesc: "Java - Core",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin",
            displayCde: "Y"
          }
        ]
      };
      service.getAllQuestionCategory().subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionCategoryId).toBe(1);
        expect(response.results[0].displayCde).toBe("Y");
        expect(response.results[0].questionCategoryDesc).toBe("Java - Core");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(getAllQuestionCategoryURL);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call findQuestionCategoryById',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionCategoryId: 1,
            questionCategoryDesc: "Java - Core",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin",
            displayCde: "Y"
          }
        ]
      };
      service.findQuestionCategoryById(1).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionCategoryId).toBe(1);
        expect(response.results[0].displayCde).toBe("Y");
        expect(response.results[0].questionCategoryDesc).toBe("Java - Core");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const actualUrl = findQuestionCategoryByIdURL+`1`
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call createQuestionCategory',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionCategoryId: 1,
            questionCategoryDesc: "Java - Core",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin",
            displayCde: "Y"
          }
        ]
      };
      const newQuestionCategory:QuestionCategoryDTO = {
        questionCategoryDesc: "Java - Core",
        evntTmestmp: null,
        evntOperId: "admin",
        displayCde: "Y"
      };
      service.createQuestionCategory(newQuestionCategory).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionCategoryId).toBe(1);
        expect(response.results[0].displayCde).toBe("Y");
        expect(response.results[0].questionCategoryDesc).toBe("Java - Core");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(createQuestionCategoryURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateQuestionCategory',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionCategoryId: 1,
            questionCategoryDesc: "Java - Core",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin",
            displayCde: "Y"
          }
        ]
      };
      const updatedQuestionCategory:QuestionCategoryDTO = {
        questionCategoryId: 1,
        questionCategoryDesc: "Java - Core",
        evntTmestmp: null,
        evntOperId: "admin",
        displayCde: "Y"
      };
      service.updateQuestionCategory(updatedQuestionCategory).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionCategoryId).toBe(1);
        expect(response.results[0].displayCde).toBe("Y");
        expect(response.results[0].questionCategoryDesc).toBe("Java - Core");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(updateQuestionCategoryURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call deleteQuestionCategory',
    fakeAsync(() => {
      let response = {
        results:
          {
            message: "successfully deleted"
          }
      };
      const actualUrl = deleteQuestionCategoryURL+`1`
      service.deleteQuestionCategory(1).subscribe((results) => {
        expect(response.results.message).toBe("successfully deleted");
      });
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("DELETE");
      req.flush(response);
    })
  );
});
