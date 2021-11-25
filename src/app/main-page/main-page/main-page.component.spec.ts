import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../testing/notification-service-stub";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {QuestionService} from "../../services/question/question.service";
import {QuestionServiceStub} from "../../../testing/question-service-stub";
import {QuestionCategoryApiService} from "../../api/question-category-api/question-category-api.service";
import {QuestionCategoryApiServiceStub} from "../../../testing/question-category-api-service-stub";
import {QuestionLevelApiService} from "../../api/question-level-api/question-level-api.service";
import {QuestionLevelApiServiceStub} from "../../../testing/question-level-api-service-stub";
import {AnswerService} from "../../services/answer/answer.service";
import {AnswerServiceStub} from "../../../testing/answer-service-stub";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule, SharedModule],
      declarations: [ MainPageComponent ],
      providers: [HttpTestingController,{ provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: QuestionService, useClass: QuestionServiceStub},
        { provide: QuestionCategoryApiService, useClass: QuestionCategoryApiServiceStub},
        { provide: QuestionLevelApiService, useClass: QuestionLevelApiServiceStub},
        { provide: AnswerService, useClass: AnswerServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    // is user logged in = true
    expect(component.isLoggedIn).toBeTrue();
    expect(component.userPrivileges).toBeTrue();
    expect(component.advUserPrivileges).toBeFalse();
    expect(component.premiumUserPrivileges).toBeFalse();
    expect(component.adminPrivileges).toBeFalse();
    expect(component.superPrivileges).toBeFalse();
    expect(component.questioncategorylist.length).toBeGreaterThan(0);
    expect(component.questioncategorymap.get(0)).toBeTruthy();
    expect(component.questionlevellist.length).toBeGreaterThan(0);
    expect(component.questionlevelmap.get(0)).toBeTruthy();
    expect(component.fullquestionItemlist.length).toBeGreaterThan(0);
    expect(component.questionItemlist.length).toBeGreaterThan(0);
    expect(component.showQuestionForm).toBeFalse();
    expect(component.filterCategoryValue).toBeNull();
    expect(component.filterDifficultyValue).toBeNull();
  });
  it('should showQuestion()', () => {
    component.filterDifficultyValue = 0;
    component.filterCategoryValue = 0;
    component.showQuestion();
    expect(component.showQuestionMode).toBeTrue();
    expect(component.showAnswerMode).toBeFalse();
    expect(component.questionItem).toBeTruthy();
    component.filterDifficultyValue = 4;
    component.filterCategoryValue = 4;
    component.showQuestion();
    expect(component.showQuestionMode).toBeFalse();
    expect(component.showAnswerMode).toBeFalse();
    expect(component.questionItem).toBeNull();
  });
  it('should showAnswer()', () => {
    component.showAnswer();
    expect(component.showAnswerMode).toBeTrue();
  });
  it('should showNextQuestion()', () => {
    component.filterDifficultyValue = 0;
    component.filterCategoryValue = 0;
    component.showQuestion();
    component.showNextQuestion();
    expect(component.showQuestionMode).toBeTrue();
    expect(component.showAnswerMode).toBeFalse();
    expect(component.questionItem).toBeTruthy();
  });
  it('should isUser()', () => {
    const tOrF:boolean = component.isUser;
    expect(tOrF).toBeTrue();
  });
  it('should isAdvUser', () => {
    const tOrF:boolean = component.isAdvUser;
    expect(tOrF).toBeFalse();
  });
  it('should isPremUser', () => {
    const tOrF:boolean = component.isPremUser;
    expect(tOrF).toBeFalse();
  });
  it('should isAdmin()', () => {
    const tOrF:boolean = component.isAdmin;
    expect(tOrF).toBeFalse();
  });
  it('should isSuper', () => {
    const tOrF:boolean = component.isSuper;
    expect(tOrF).toBeFalse();
  });
  it('should isUserLoggedIn', () => {
    const tOrF:boolean = component.isUserLoggedIn();
    expect(tOrF).toBeTrue();
  });
});
