import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminPageComponent } from './admin-page.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationServiceStub} from "../../../../testing/authentication-service-stub";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import { Location } from "@angular/common";
import {routes} from "../../admin-pages-routing.module";
import {SharedModule} from "../../../shared/shared.module";

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationServiceStub;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ AdminPageComponent ],
      providers: [HttpTestingController,
        { provide: AuthenticationService, useClass: AuthenticationServiceStub}]
    })
    .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) as AuthenticationServiceStub;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('navigate to "" redirects you to /home', fakeAsync(() => {
    console.log("inside ***");
    component.gotoAdminConsole();
    console.log("path = " + location.path());
    expect(location.path()).toBe("/mainpage");
  }));*/
  it('should displayUsers', () => {
    component.displayUsers();
    expect(component.showUsers).toBeTrue();
    expect(component.showQuestions).toBeFalse();
    expect(component.showQuestionCategories).toBeFalse();
    expect(component.showQuestionLevels).toBeFalse();
    expect(component.showAnswers).toBeFalse();
  });
  it('should displayQuestions', () => {
    component.displayQuestions();
    expect(component.showUsers).toBeFalse();
    expect(component.showQuestions).toBeTrue();
    expect(component.showQuestionCategories).toBeFalse();
    expect(component.showQuestionLevels).toBeFalse();
    expect(component.showAnswers).toBeFalse();
  });
  it('should displayQuestionCategories', () => {
    component.displayQuestionCategories();
    expect(component.showUsers).toBeFalse();
    expect(component.showQuestions).toBeFalse();
    expect(component.showQuestionCategories).toBeTrue();
    expect(component.showQuestionLevels).toBeFalse();
    expect(component.showAnswers).toBeFalse();
  });
  it('should displayQuestionLevels', () => {
    component.displayQuestionLevels();
    expect(component.showUsers).toBeFalse();
    expect(component.showQuestions).toBeFalse();
    expect(component.showQuestionCategories).toBeFalse();
    expect(component.showQuestionLevels).toBeTrue();
    expect(component.showAnswers).toBeFalse();
  });
  it('should displayAnswers', () => {
    component.displayAnswers();
    expect(component.showUsers).toBeFalse();
    expect(component.showQuestions).toBeFalse();
    expect(component.showQuestionCategories).toBeFalse();
    expect(component.showQuestionLevels).toBeFalse();
    expect(component.showAnswers).toBeTrue();
  });

});
