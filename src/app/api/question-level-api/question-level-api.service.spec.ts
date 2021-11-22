import {fakeAsync, TestBed} from '@angular/core/testing';
import { QuestionLevelApiService } from './question-level-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {QuestionLevelDTO} from "../../models/QuestionLevelDTO";

describe('QuestionLevelApiService', () => {
  let service: QuestionLevelApiService;
  let httpTestingController: HttpTestingController;
  const host = environment.apiUrl;
  const getAllQuestionLevelURL = `${host}/questionlevel/all`;
  const findQuestionLevelByIdURL = `${host}/questionlevel/findById/`;
  const createQuestionLevelURL = `${host}/questionlevel/create`;
  const updateQuestionLevelURL = `${host}/questionlevel/update`;
  const deleteQuestionLevelURL = `${host}/questionlevel/delete/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionLevelApiService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QuestionLevelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllQuestionLevel',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionLevelId: 1,
            questionLevelDesc: "EASY",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin"
          }
        ]
      };
      service.getAllQuestionLevel().subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionLevelDesc).toBe("EASY");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(getAllQuestionLevelURL);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call findQuestionLevelById',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionLevelId: 1,
            questionLevelDesc: "EASY",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin"
          }
        ]
      };
      service.findQuestionLevelById(1).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionLevelDesc).toBe("EASY");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const actualUrl = findQuestionLevelByIdURL+`1`
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call createQuestionLevel',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionLevelId: 1,
            questionLevelDesc: "EASY",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin"
          }
        ]
      };
      const newQuestionLevel:QuestionLevelDTO = {
        questionLevelDesc: "EASY",
        evntTmestmp: null,
        evntOperId: "admin"
      };
      service.createQuestionLevel(newQuestionLevel).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionLevelDesc).toBe("EASY");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(createQuestionLevelURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateQuestionLevel',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionLevelId: 1,
            questionLevelDesc: "EASY",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "admin"
          }
        ]
      };
      const updatedQuestionLevel:QuestionLevelDTO = {
        questionLevelId: 1,
        questionLevelDesc: "EASY",
        evntTmestmp: null,
        evntOperId: "admin"
      };
      service.updateQuestionLevel(updatedQuestionLevel).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionLevelDesc).toBe("EASY");
        expect(response.results[0].evntOperId).toBe("admin");
      });
      const req = httpTestingController.expectOne(updateQuestionLevelURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call deleteQuestionLevel',
    fakeAsync(() => {
      let response = {
        results:
          {
            message: "successfully deleted"
          }
      };
      const actualUrl = deleteQuestionLevelURL+`1`
      service.deleteQuestionLevel(1).subscribe((results) => {
        expect(response.results.message).toBe("successfully deleted");
      });
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("DELETE");
      req.flush(response);
    })
  );
});
