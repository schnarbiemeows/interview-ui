import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionCategoryService } from './question-category.service';
import {Subscription} from "rxjs";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionCategoryApiServiceStub} from "../../../testing/question-category-api-service-stub";
import {QuestionCategoryDTO} from "../../models/QuestionCategoryDTO";

describe('QuestioncategoryService', () => {
  let service: QuestionCategoryService;
  let httpTestingController: HttpTestingController;
  let susbscriptions: Subscription[] = [];
  let questionCategoryApiServiceStub: QuestionCategoryApiServiceStub;

  beforeEach(() => {
    questionCategoryApiServiceStub = new QuestionCategoryApiServiceStub();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionCategoryService,
        { provide : QuestionCategoryApiService, useValue : questionCategoryApiServiceStub}]
    });
    service = TestBed.inject(QuestionCategoryService);
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
  it('should changeShowForm', () => {
    service.changeShowForm(true);
    let tOrF:boolean = false;
    susbscriptions.push(service.showForm$.subscribe(rec => {
      tOrF = rec;
      expect(tOrF).toBeTrue();
    }))
  });
  it('should searchQuestionCategory', () => {
    service.reloadCategory();
    let count = 0;
    service.searchQuestionCategory('Java');
    let list = [];
    susbscriptions.push(service.questioncategorylist$.subscribe(rec => {
      list = rec;
      if(count==0) {
        expect(list.length).toBe(1);
        count = 1;
      } else if(count==1) {
        // this is because, on the second search , when there are no results, the list will temporarily
        // be empty before the method repopulates it with the full list
        expect(list.length).toBe(0);
        count = 2;
      } else {
        expect(list.length).toBe(3);
      }
    }));
    service.searchQuestionCategory('XXX');
  });
  it('should initiateAddCategory', () => {
    const item = service.initiateAddCategory();
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
  it('should initiateEditCategoryItem', () => {
    console.log("inside initiateEditCategoryItem 1");
    service.reloadCategory();
    console.log("inside initiateEditCategoryItem 2");
    const item = service.initiateEditCategoryItem(0);
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
  it('should deleteCategoryItem', () => {
    service.reloadCategory();
    service.deleteCategoryItem(0);
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
  it('should saveResultsCategory', () => {
    service.initiateAddCategory();
    const newQuestionCategory:QuestionCategoryDTO = {
      questionCategoryId: 1,
      questionCategoryDesc: "EASY",
      evntTmestmp: null,
      evntOperId: "admin",
      displayCde: "Y"
    };
    service.saveResultsCategory(newQuestionCategory);
    expect(service).toBeTruthy();
    service.initiateEditCategoryItem(0);
    service.saveResultsCategory(newQuestionCategory);
    expect(service).toBeTruthy();
  });
  it('should destroy', () => {
    service.destroy();
    expect(service).toBeTruthy();
  });
});
