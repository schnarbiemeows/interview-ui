import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAndAnswersComponent } from './questions-and-answers.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../../testing/notification-service-stub";
import {QuestionLevelServiceStub} from "../../../../testing/question-level-service-stub";
import {QuestionCategoryServiceStub} from "../../../../testing/question-category-service-stub";
import {NotificationService} from "../../../services/notification/notification.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {QuestionCategoryService} from "../../../services/questioncategory/question-category.service";
import {QuestionLevelService} from "../../../services/questionlevel/question-level.service";
import {QuestionAndAnswersServiceStub} from "../../../../testing/questions-and-answers-service-stub";
import {QuestionAndAnswersService} from "../../../services/question-and-answers/question-and-answers.service";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {NotificationType} from "../../../enum/notification-type.enum";
import {QuestionApiService} from "../../../api/question-api/question-api.service";
import {QuestionApiServiceStub} from "../../../../testing/question-api-service-stub";
import {AnswerApiServiceStub} from "../../../../testing/answer-api-service-stub";
import {AnswerApiService} from "../../../api/answer-api/answer-api.service";
import {QuestionCategoryApiService} from "../../../api/question-category-api/question-category-api.service";
import {QuestionCategoryApiServiceStub} from "../../../../testing/question-category-api-service-stub";
import {QuestionLevelApiServiceStub} from "../../../../testing/question-level-api-service-stub";
import {QuestionLevelApiService} from "../../../api/question-level-api/question-level-api.service";
import {HttpClient} from "@angular/common/http";
import {AppModule} from "../../../app.module";

describe('QuestionsAndAnswersComponent', () => {
  let component: QuestionsAndAnswersComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let notificationService: NotificationServiceStub;
  let questionAndAnswersService: QuestionAndAnswersServiceStub;
  /*let questionApiService: QuestionApiServiceStub;
  let answerApiService: AnswerApiServiceStub;
  let questionCategoryApiService: QuestionCategoryApiServiceStub;
  let questionLevelApiService: QuestionLevelApiServiceStub;*/
  beforeEach(async () => {
    /*authService = new AuthenticationServiceStub();
    notificationService = new NotificationServiceStub();
    questionAndAnswersService = new QuestionAndAnswersServiceStub();
    questionApiService = new QuestionApiServiceStub();
    answerApiService = new AnswerApiServiceStub();
    questionCategoryApiService = new QuestionCategoryApiServiceStub();
    questionLevelApiService = new QuestionLevelApiServiceStub();*/
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ QuestionsAndAnswersComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: QuestionAndAnswersService, useClass: QuestionAndAnswersServiceStub}
        /*,
        { provide: QuestionApiService, useValue: questionApiService},
        { provide: AnswerApiService, useValue: answerApiService},
        { provide: QuestionCategoryApiService, useValue: questionCategoryApiService},
        { provide: QuestionLevelApiService, useValue: questionLevelApiService}*/
      ]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) as AuthenticationServiceStub;
    notificationService = TestBed.inject(NotificationService) as NotificationServiceStub;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a new object on initiateAdd()', () => {
    component.initiateAdd();
    expect(component.questionAnswerItem).toBeTruthy();
  });
  it('should retrieve an object on editItem()', () => {
    component.editItem(0);
    expect(component.questionAnswerItem).toBeTruthy();
  });
  it('should receiveFormSaveAdd()', () => {
    component.receiveFormSaveAdd(new QuestionAnswerItemDTO());
    expect(component).toBeTruthy();
  });
  it('should receiveFormSaveEdit()', () => {
    component.receiveFormSaveEdit(new QuestionAnswerItemDTO());
    expect(component).toBeTruthy();
  });
  it('should receiveFormCancel()', () => {
    component.receiveFormCancel();
    expect(component).toBeTruthy();
  });
  it('should deleteItem()', () => {
    component.deleteItem(0);
    expect(component).toBeTruthy();
  });

  it('should isUser()', () => {
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
  it('should search()', () => {
    component.search('value');
    expect(component).toBeTruthy();
  });
  it('should filter()', () => {
    component.filter(null);
    expect(component).toBeTruthy();
  });
  it('should resetFullList()', () => {
    component.resetFullList();
    expect(component).toBeTruthy();
  });
});
