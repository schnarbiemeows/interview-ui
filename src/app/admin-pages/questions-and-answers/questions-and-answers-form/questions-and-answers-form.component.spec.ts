import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAndAnswersFormComponent } from './questions-and-answers-form.component';

describe('QuestionsAndAnswersFormComponent', () => {
  let component: QuestionsAndAnswersFormComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAndAnswersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndAnswersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
