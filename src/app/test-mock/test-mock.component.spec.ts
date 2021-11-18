import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestMockComponent } from './test-mock.component';
import {FakeService} from "../../testing/fake-service";
import {RealServiceService} from "../services/real-service.service";

describe('TestMockComponent', () => {
  let component: TestMockComponent;
  let fixture: ComponentFixture<TestMockComponent>;
  let fakeService: FakeService;

  beforeEach(async () => {
    fakeService = new FakeService();
    await TestBed.configureTestingModule({
      declarations: [ TestMockComponent ],
      providers: [{provide: RealServiceService, useValue: fakeService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test method', () => {
    component.test();
    expect(component.message).toEqual("FAKE");
  })
});
