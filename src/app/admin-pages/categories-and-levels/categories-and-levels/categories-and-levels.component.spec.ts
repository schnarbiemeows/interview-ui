import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesAndLevelsComponent } from './categories-and-levels.component';
import {NotificationService} from "../../../services/notification/notification.service";
import {NotificationServiceStub} from "../../../../testing/notification-service-stub";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {QuestionCategoryService} from "../../../services/questioncategory/question-category.service";
import {QuestionCategoryServiceStub} from "../../../../testing/question-category-service-stub";
import {QuestionLevelService} from "../../../services/questionlevel/question-level.service";
import {QuestionLevelServiceStub} from "../../../../testing/question-level-service-stub";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {SharedModule} from "../../../shared/shared.module";

describe('CategoriesAndLevelsComponent', () => {
  let component: CategoriesAndLevelsComponent;
  let fixture: ComponentFixture<CategoriesAndLevelsComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let notificationService: NotificationServiceStub;
  let levelService: QuestionLevelServiceStub;
  let categoryService: QuestionCategoryServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CategoriesAndLevelsComponent ],
      providers: [HttpTestingController,{ provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: QuestionCategoryService, useClass: QuestionCategoryServiceStub},
        { provide: QuestionLevelService, useClass: QuestionLevelServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) as AuthenticationServiceStub;
    notificationService = TestBed.inject(NotificationService) as NotificationServiceStub;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAndLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get isUser()', () => {
    let torf = component.isUser;
    //console.log("component. = " + component.)
    expect(torf).toBeTrue();
  });
  it('should get isAdvUser()', () => {
    let torf = component.isAdvUser;
    expect(torf).toBeFalse();
  });
  it('should get isPremUser()', () => {
    let torf = component.isPremUser;
    expect(torf).toBeFalse();
  });
  it('should get isAdmin()', () => {
    let torf = component.isAdmin;
    expect(torf).toBeFalse();
  });
  it('should get isSuper()', () => {
    let torf = component.isSuper;
    expect(torf).toBeFalse();
  });
  it('should reloadCategory()', () => {
    component.reloadCategory();
    expect(component).toBeTruthy();
  });
  it('should reloadLevel()', () => {
    component.reloadLevel();
    expect(component).toBeTruthy();
  });
  it('should searchCategory()', () => {
    component.searchCategory('params');
    expect(component).toBeTruthy();
  });
  it('should searchLevel()', () => {
    component.searchLevel('params');
    expect(component).toBeTruthy();
  });
  it('should initiateAddCategory()', () => {
    component.initiateAddCategory();
    expect(component).toBeTruthy();
  });
  it('should initiateAddLevel()', () => {
    component.initiateAddLevel();
    expect(component).toBeTruthy();
  });
  it('should receiveAndRelayInitiateEditCategory()', () => {
    component.receiveAndRelayInitiateEditCategory(0);
    expect(component).toBeTruthy();
  });
  it('should receiveAndRelayDeleteCategory()', () => {
    component.receiveAndRelayDeleteCategory(0);
    expect(component).toBeTruthy();
  });
  it('should receiveAndRelayInitiateEditLevel()', () => {
    component.receiveAndRelayInitiateEditLevel(0);
    expect(component).toBeTruthy();
  });
  it('should receiveAndRelayDeleteLevel()', () => {
    component.receiveAndRelayDeleteLevel(0);
    expect(component).toBeTruthy();
  });
  it('should receiveLevelFormSaveAdd()', () => {
    let item: QuestionLevelDTO = {
      questionLevelId: 0,
      questionLevelDesc: '',
      evntTmestmp: null,
      evntOperId: ''
    };
    component.receiveLevelFormSaveAdd(item);
    expect(component).toBeTruthy();
  });
  it('should receiveCategoryFormSaveAdd()', () => {
    let item:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    component.receiveCategoryFormSaveAdd(item);
    expect(component).toBeTruthy();
  });
  it('should receiveLevelFormSaveEdit()', () => {
    let item: QuestionLevelDTO = {
      questionLevelId: 0,
      questionLevelDesc: '',
      evntTmestmp: null,
      evntOperId: ''
    };
    component.receiveLevelFormSaveEdit(item);
    expect(component).toBeTruthy();
  });
  it('should receiveCategoryFormSaveEdit()', () => {
    let item:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    component.receiveCategoryFormSaveEdit(item);
    expect(component).toBeTruthy();
  });
  it('should receiveLevelFormCancel()', () => {
    component.receiveLevelFormCancel(null);
    expect(component).toBeTruthy();
  });
  it('should receiveCategoryFormCancel()', () => {
    component.receiveCategoryFormCancel(null);
    expect(component).toBeTruthy();
  });
});
