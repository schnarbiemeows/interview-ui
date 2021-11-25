import { TestBed } from '@angular/core/testing';
import { QuestionAndAnswersService } from './question-and-answers.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {QuestionLevelApiServiceStub} from "../../../testing/question-level-api-service-stub";
import {QuestionCategoryApiServiceStub} from "../../../testing/question-category-api-service-stub";
import {AnswerApiServiceStub} from "../../../testing/answer-api-service-stub";
import {QuestionApiServiceStub} from "../../../testing/question-api-service-stub";
import {QuestionApiService} from "../../api/question-api/question-api.service";
import {AnswerApiService} from "../../api/answer-api/answer-api.service";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {Subscription} from "rxjs";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";
import {ForeignKeyOptionsDTO} from "../../models/ForeignKeyOptionsDTO";
import {QuestionDTO} from "../../models/QuestionDTO";
import {AnswerDTO} from "../../models/AnswerDTO";
import {FilterParamsDTO} from "../../models/FilterParamsDTO";

describe('QuestionAndAnswersService', () => {
  let susbscriptions: Subscription[] = [];
  let httpTestingController: HttpTestingController;
  let service: QuestionAndAnswersService;
  let questionApiService: QuestionApiServiceStub;
  let answerApiService: AnswerApiServiceStub;
  let questionCategoryApiService: QuestionCategoryApiServiceStub;
  let questionLevelApiService: QuestionLevelApiServiceStub;

  let loaded: boolean;
  let addMode:boolean;
  let editMode:boolean;
  let showForm: boolean;
  let paginationDisabled: boolean;
  let questionAnswerlist: QuestionAnswerItemDTO[];
  let questioncategorylist:ForeignKeyOptionsDTO[] = [];  // for the filter
  let questionlevellist:ForeignKeyOptionsDTO[] = []; // for the filter
  let questionCategoryFormList:ForeignKeyOptionsDTO[] = []; // for the form
  let questionLevelFormList:ForeignKeyOptionsDTO[] = []; // for the form
  let totalQuestions: number;  // for the filter
  let filterCategoryValue: number; // for the filter
  let filterDifficultyValue: number; // for the filter
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
  beforeEach(() => {
    questionApiService = new QuestionApiServiceStub();
    answerApiService = new AnswerApiServiceStub();
    questionCategoryApiService = new QuestionCategoryApiServiceStub();
    questionLevelApiService = new QuestionLevelApiServiceStub();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionAndAnswersService,
        { provide: QuestionApiService, useValue: questionApiService},
        { provide: AnswerApiService, useValue: answerApiService},
        { provide: QuestionCategoryApiService, useValue: questionCategoryApiService},
        { provide: QuestionLevelApiService, useValue: questionLevelApiService}
      ]
    });
    service = TestBed.inject(QuestionAndAnswersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    susbscriptions.forEach(sub => sub.unsubscribe());
  });
  afterAll(() => {
    service.destroy();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should reload()', () => {
    service.reload();
    susbscriptions.push(
      service.loaded$.subscribe((data) => {
        loaded = data;
        expect(loaded).toBeTrue();
      })
    );
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeFalse();
      })
    );
    susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeFalse();
      })
    );
    susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeFalse();
      })
    );
    susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeFalse();
      })
    );
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        console.log("questionAnswerlist length = " + questionAnswerlist.length);
        expect(questionAnswerlist.length).toEqual(3);
      })
    );
    susbscriptions.push(
      service.totalQuestions$.subscribe((data) => {
        totalQuestions = data;
        expect(totalQuestions).toEqual(3);
      })
    );
  });
  it('should getCategories()', () => {
    service.getCategories();
    susbscriptions.push(
      service.questioncategorylist$.subscribe((data) => {
        questioncategorylist = data;
        expect(questioncategorylist.length).toEqual(3);
      })
    ); susbscriptions.push(
      service.questionCategoryFormList$.subscribe((data) => {
        questionCategoryFormList = data;
        expect(questionCategoryFormList.length).toEqual(3);
      })
    );
  });
  it('should getLevels()', () => {
    service.getLevels();
    susbscriptions.push(
      service.questionlevellist$.subscribe((data) => {
        questionlevellist = data;
        expect(questionlevellist.length).toEqual(3);
      })
    ); susbscriptions.push(
      service.questionLevelFormList$.subscribe((data) => {
        questionLevelFormList = data;
        expect(questionLevelFormList.length).toEqual(3);
      })
    );
  });
  it('should initiateAdd()', () => {
    service.reload();
    service.getLevels();
    service.getCategories();
    const filterParams:FilterParamsDTO = {
      filterCategoryValue:0,
      filterDifficultyValue:0
    };
    service.filter(filterParams);
    service.initiateAdd();
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeTrue();
      })
    ); susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeTrue();
      })
    ); susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeTrue();
      })
    ); susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeFalse();
      })
    );
  });
  it('should initiateEditItem()', () => {
    service.reload();
    const item:QuestionAnswerItemDTO = service.initiateEditItem(0);
    expect(item).toBeTruthy();
    susbscriptions.push(
      service.paginationDisabled$.subscribe((data) => {
        paginationDisabled = data;
        expect(paginationDisabled).toBeTrue();
      })
    ); susbscriptions.push(
      service.showForm$.subscribe((data) => {
        showForm = data;
        expect(showForm).toBeTrue();
      })
    ); susbscriptions.push(
      service.addMode$.subscribe((data) => {
        addMode = data;
        expect(addMode).toBeFalse();
      })
    ); susbscriptions.push(
      service.editMode$.subscribe((data) => {
        editMode = data;
        expect(editMode).toBeTrue();
      })
    );
  });
  it('should deleteItem()', () => {
    service.reload();
    let firstCallMade:boolean = false;
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        if(firstCallMade) {
          expect(questionAnswerlist.length).toEqual(2);
        } else {
          expect(questionAnswerlist.length).toEqual(3);
          firstCallMade=true;
        }
      })
    );
    service.deleteItem(0);
  });
  it('should saveResults()', () => {
    // should do this twice, once for add, and once for edit
    service.reload();
    service.initiateAdd();
    service.saveResults(newQuestionAnswerPair);
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        expect(questionAnswerlist.length).toEqual(3);
      })
    );
    service.initiateEditItem(0);
    service.saveResults(newQuestionAnswerPair);
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        expect(questionAnswerlist.length).toEqual(3);
      })
    );
  });
  it('should searchQuestionsAndAnswers()', () => {
    // should do this twice, once that finds matches, and once that does not
    service.reload();
    service.searchQuestionsAndAnswers("XXX no match");
    let firstCallMade:boolean = false;
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        if(firstCallMade) {
          expect(questionAnswerlist.length).toEqual(1);
        } else {
          expect(questionAnswerlist.length).toEqual(3);
          firstCallMade=true;
        }
      })
    );
    service.searchQuestionsAndAnswers("Java");
  });
  it('should filter() and then reset the full list', () => {
    service.reload();
    let firstCallMade:boolean = false;
    const filterParams:FilterParamsDTO = {
      filterCategoryValue:0,
      filterDifficultyValue:0
    };
    service.filter(filterParams);
    susbscriptions.push(
      service.questionItemlist$.subscribe((data) => {
        questionAnswerlist = data;
        if(firstCallMade) {
          expect(questionAnswerlist.length).toEqual(3);
        } else {
          expect(questionAnswerlist.length).toEqual(1);
          firstCallMade=true;
        }
      })
    );
    service.resetFullList();
  });
  it('should destroy()', () => {
    service.destroy();
    expect(service).toBeTruthy();
  });
});
