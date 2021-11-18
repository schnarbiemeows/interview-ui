import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuestionsAndAnswersComponent } from './filter-questions-and-answers.component';

describe('FilterQuestionsAndAnswersComponent', () => {
  let component: FilterQuestionsAndAnswersComponent;
  let fixture: ComponentFixture<FilterQuestionsAndAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterQuestionsAndAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterQuestionsAndAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
