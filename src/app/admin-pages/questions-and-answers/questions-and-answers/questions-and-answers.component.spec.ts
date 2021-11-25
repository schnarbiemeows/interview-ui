import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAndAnswersComponent } from './questions-and-answers.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {NotificationServiceStub} from "../../../../testing/notification-service-stub";
import {NotificationService} from "../../../services/notification/notification.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {QuestionAndAnswersServiceStub} from "../../../../testing/questions-and-answers-service-stub";
import {QuestionAndAnswersService} from "../../../services/question-and-answers/question-and-answers.service";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {SharedModule} from "../../../shared/shared.module";


describe('QuestionsAndAnswersComponent', () => {
  let component: QuestionsAndAnswersComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let notificationService: NotificationServiceStub;
  let questionAndAnswersService: QuestionAndAnswersServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ QuestionsAndAnswersComponent ],
      providers: [HttpTestingController,
        { provide: NotificationService, useClass: NotificationServiceStub},
        { provide: AuthenticationService, useClass: AuthenticationServiceStub},
        { provide: QuestionAndAnswersService, useClass: QuestionAndAnswersServiceStub}

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
