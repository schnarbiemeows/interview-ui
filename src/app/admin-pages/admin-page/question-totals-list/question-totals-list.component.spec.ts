import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTotalsListComponent } from './question-totals-list.component';

describe('QuestionTotalsListComponent', () => {
  let component: QuestionTotalsListComponent;
  let fixture: ComponentFixture<QuestionTotalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTotalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTotalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
