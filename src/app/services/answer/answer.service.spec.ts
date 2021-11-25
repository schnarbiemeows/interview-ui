import { TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnswerService } from './answer.service';
import {environment} from "../../../environments/environment";
import {AnswerDto} from "../../models/answer-dto";

describe('AnswerService', () => {
  let service: AnswerService;
  let httpTestingController: HttpTestingController;

  let host = environment.apiUrl;
  const getAllAnswerURL : string = `${host}/answer/all`;
  const findAnswerByIdURL : string = `${host}/answer/findById/`;
  const createAnswerURL : string = `${host}/answer/create`;
  const updateAnswerURL : string = `${host}/answer/update`;
  const deleteAnswerURL : string = `${host}/answer/delete/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnswerService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AnswerService);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllAnswer',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            answerId: 63,
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntTmestmp: "2021-11-13T22:51:44.590+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      service.getAllAnswer().subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(getAllAnswerURL);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call findAnswerById',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            answerId: 63,
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntTmestmp: "2021-11-13T22:51:44.590+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      service.findAnswerById(63).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const actualUrl = findAnswerByIdURL+`63`
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call createAnswer',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            answerId: 63,
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntTmestmp: "2021-11-13T22:51:44.590+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const newAnswer:AnswerDto = {
        answerTxt: 'use the sed command - sed s/x/y/g <file name>',
        evntTmestmp: null,
        evntOperId: 'schnarbiemeows'
      };
      service.createAnswer(newAnswer).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(createAnswerURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateAnswer',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            answerId: 63,
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntTmestmp: "2021-11-13T22:51:44.590+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const editAnswer:AnswerDto = {
        answerId: 63,
        answerTxt: 'use the sed command - sed s/x/y/g <file name>',
        evntTmestmp: null,
        evntOperId: 'schnarbiemeows'
      };
      service.updateAnswer(editAnswer).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(updateAnswerURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call deleteAnswer',
    fakeAsync(() => {
      let response = {
        results:
          {
            message: "successfully deleted"
          }
      };
      const actualUrl = deleteAnswerURL+`63`
      service.deleteAnswer(63).subscribe((results) => {
        expect(response.results.message).toBe("successfully deleted");
      });
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("DELETE");
      req.flush(response);
    })
  );
});
