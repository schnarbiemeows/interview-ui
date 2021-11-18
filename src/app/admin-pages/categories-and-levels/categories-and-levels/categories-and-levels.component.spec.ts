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
    levelService = TestBed.inject(QuestionLevelService) as QuestionLevelServiceStub;
    categoryService = TestBed.inject(QuestionCategoryService) as QuestionCategoryServiceStub;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAndLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
