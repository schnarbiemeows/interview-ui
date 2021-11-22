import {TestBed, tick} from '@angular/core/testing';

import { QuestionLevelService } from './question-level.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {QuestionLevelApiServiceStub} from "../../../testing/question-level-api-service-stub";
import {AuthenticationService} from "../authentication/authentication.service";
import {QuestionLevelDTO} from "../../models/QuestionLevelDTO";
import {Subscription} from "rxjs";

describe('QuestionlevelService', () => {
  let service: QuestionLevelService;
  let httpTestingController: HttpTestingController;
  let susbscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionLevelService,
      { provide: QuestionLevelApiService, useClass: QuestionLevelApiServiceStub}]
    });
    service = TestBed.inject(QuestionLevelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    susbscriptions.forEach(sub => sub.unsubscribe());
  });
  afterAll(() => {
    console.log("for the last time : calling the QuestionLevelService.destroy() method");
    service.destroy();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should changeShowForm', () => {
    service.changeShowForm(true);
    let tOrF:boolean = false;
    susbscriptions.push(service.showForm$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeTrue();
    }))
  });
  it('should searchQuestionLevel', () => {
    service.reloadLevel();
    service.searchQuestionLevel('EASY');
    let list = [];
    susbscriptions.push(service.questionlevellist$.subscribe(rec => {
      list = rec;
      expect(list.length).toBe(1);
    }));
    service.reloadLevel();
    service.searchQuestionLevel('HARD');
    list = [];
    susbscriptions.push(service.questionlevellist$.subscribe(rec => {
      list = rec;
      expect(list.length).toBe(1);
    }));
  });
  it('should initiateAddLevel', () => {
    const item = service.initiateAddLevel();
    expect(item).toBeTruthy();
    let tOrF = false;
    susbscriptions.push(service.addMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeTrue();
    }));
    susbscriptions.push(service.editMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeFalse();
    }));
  });
  it('should initiateEditLevelItem', () => {
    service.reloadLevel();
    const item = service.initiateEditLevelItem(0);
    expect(item).toBeTruthy();
    let tOrF = true;
    susbscriptions.push(service.addMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeFalse();
    }));
    susbscriptions.push(service.editMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeTrue();
    }));
  });
  it('should deleteLevelItem', () => {
    service.reloadLevel();
    service.deleteLevelItem(0);
    expect(service).toBeTruthy();
    let tOrF = true;
    susbscriptions.push(service.addMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeFalse();
    }));
    susbscriptions.push(service.editMode$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeFalse();
    }));
  });
  it('should saveResultsLevel', () => {
    service.initiateAddLevel();
    const newQuestionLevel:QuestionLevelDTO = {
      questionLevelId: 1,
      questionLevelDesc: "EASY",
      evntTmestmp: null,
      evntOperId: "admin"
    };
    service.saveResultsLevel(newQuestionLevel);
    expect(service).toBeTruthy();
    service.initiateEditLevelItem(0);
    service.saveResultsLevel(newQuestionLevel);
    expect(service).toBeTruthy();
  });
  it('should destroy', () => {
    service.destroy();
    expect(service).toBeTruthy();
  });
});
