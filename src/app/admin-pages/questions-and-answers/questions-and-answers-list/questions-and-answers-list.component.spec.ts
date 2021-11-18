import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAndAnswersListComponent } from './questions-and-answers-list.component';

describe('QuestionsAndAnswersListComponent', () => {
  let component: QuestionsAndAnswersListComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAndAnswersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
