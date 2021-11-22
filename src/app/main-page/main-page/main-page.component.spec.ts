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

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
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
    expect(component).toBeTruthy();
  });
});
