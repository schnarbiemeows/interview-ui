import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTotalsListItemComponent } from './question-totals-list-item.component';

describe('QuestionTotalsListItemComponent', () => {
  let component: QuestionTotalsListItemComponent;
  let fixture: ComponentFixture<QuestionTotalsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTotalsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTotalsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
