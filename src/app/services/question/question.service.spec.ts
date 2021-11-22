import {fakeAsync, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import {environment} from "../../../environments/environment";
import {AnswerDTO} from "../../models/AnswerDTO";
import {QuestionDTO} from "../../models/QuestionDTO";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";

describe('QuestionService', () => {
  let service: QuestionService;
  let httpTestingController: HttpTestingController;
  const host = environment.apiUrl;
  const getAllQuestionURL = `${host}/question/all`;
  const findQuestionByIdURL = `${host}/question/findById/`;
  const createQuestionURL = `${host}/question/create`;
  const updateQuestionURL = `${host}/question/update`;
  const deleteQuestionURL = `${host}/question/delete/`;
  const createQuestionAnswerURL = `${host}/question/createpair/`;
  const updateQuestionAnswerURL = `${host}/question/updatepair/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getAllQuestion',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      service.getAllQuestion().subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(getAllQuestionURL);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call findQuestionById',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      service.findQuestionById(63).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const actualUrl = findQuestionByIdURL+`63`
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("GET");
      req.flush(response);
    })
  );
  it('should call createQuestion',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const newQuestion:QuestionDTO = {
        questionCategoryId: 5,
        questionLevelId: 1,
        answerId: 63,
        questionTxt: "how do you replace a word in a file with another word?",
        evntTmestmp: null,
        evntOperId: "schnarbiemeows"
      };
      service.createQuestion(newQuestion).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(createQuestionURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateQuestion',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            evntTmestmp: "2021-11-13T22:51:44.850+0000",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const updatedQuestion:QuestionDTO = {
        questionId: 64,
        questionCategoryId: 5,
        questionLevelId: 1,
        answerId: 63,
        questionTxt: "how do you replace a word in a file with another word?",
        evntTmestmp: null,
        evntOperId: "schnarbiemeows"
      };
      service.updateQuestion(updatedQuestion).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(updateQuestionURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call deleteQuestion',
    fakeAsync(() => {
      let response = {
        results:
          {
            message: "successfully deleted"
          }
      };
      const actualUrl = deleteQuestionURL+`64`
      service.deleteQuestion(64).subscribe((results) => {
        expect(response.results.message).toBe("successfully deleted");
      });
      const req = httpTestingController.expectOne(actualUrl);
      expect(req.request.method).toEqual("DELETE");
      req.flush(response);
    })
  );

  it('should call createQuestionAnswerPair',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const newQuestionAnswerPair = new QuestionAnswerItemDTO();
      const newQuestion:QuestionDTO = {
        questionCategoryId: 5,
        questionLevelId: 1,
        questionTxt: "how do you replace a word in a file with another word?",
        evntTmestmp: null,
        evntOperId: "schnarbiemeows"
      };
      const newAnswer:AnswerDTO = {
        answerTxt: 'use the sed command - sed s/x/y/g <file name>',
        evntTmestmp: null,
        evntOperId: 'schnarbiemeows'
      };
      newQuestionAnswerPair.fromDtos(newQuestion,newAnswer);
      service.createQuestionAnswerPair(newQuestionAnswerPair).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(createQuestionAnswerURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
  it('should call updateQuestionAnswerPair',
    fakeAsync(() => {
      let response = {
        resultCount: 1,
        results: [
          {
            questionId: 64,
            questionCategoryId: 5,
            questionLevelId: 1,
            answerId: 63,
            questionTxt: "how do you replace a word in a file with another word?",
            answerTxt: "use the sed command - sed s/x/y/g <file name>",
            evntOperId: "schnarbiemeows"
          }
        ]
      };
      const updatedQuestionAnswerPair = new QuestionAnswerItemDTO();
      const updatedQuestion:QuestionDTO = {
        questionCategoryId: 5,
        questionLevelId: 1,
        questionTxt: "how do you replace a word in a file with another word?",
        evntTmestmp: null,
        evntOperId: "schnarbiemeows"
      };
      const updatedAnswer:AnswerDTO = {
        answerTxt: 'use the sed command - sed s/x/y/g <file name>',
        evntTmestmp: null,
        evntOperId: 'schnarbiemeows'
      };
      updatedQuestionAnswerPair.fromDtos(updatedQuestion,updatedAnswer);
      service.updateQuestionAnswerPair(updatedQuestionAnswerPair).subscribe((results) => {
        expect(response.results.length).toBe(1);
        expect(response.results[0].questionId).toBe(64);
        expect(response.results[0].answerId).toBe(63);
        expect(response.results[0].questionCategoryId).toBe(5);
        expect(response.results[0].questionLevelId).toBe(1);
        expect(response.results[0].questionTxt).toBe("how do you replace a word in a file with another word?");
        expect(response.results[0].answerTxt).toBe("use the sed command - sed s/x/y/g <file name>");
        expect(response.results[0].evntOperId).toBe("schnarbiemeows");
      });
      const req = httpTestingController.expectOne(updateQuestionAnswerURL);
      expect(req.request.method).toEqual("POST");
      req.flush(response);
    })
  );
});
