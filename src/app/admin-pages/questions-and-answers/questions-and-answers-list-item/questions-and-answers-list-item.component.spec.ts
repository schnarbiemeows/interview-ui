import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAndAnswersListItemComponent } from './questions-and-answers-list-item.component';

describe('QuestionsAndAnswersListItemComponent', () => {
  let component: QuestionsAndAnswersListItemComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAndAnswersListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAndAnswersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
