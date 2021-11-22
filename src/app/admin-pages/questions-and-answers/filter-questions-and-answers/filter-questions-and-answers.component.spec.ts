import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterQuestionsAndAnswersComponent } from './filter-questions-and-answers.component';
import {Component} from "@angular/core";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {QuestionDTO} from "../../../models/QuestionDTO";
import {AnswerDTO} from "../../../models/AnswerDTO";
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";
import {FormsModule} from "@angular/forms";

@Component({
  template: '<app-filter-questions-and-answers\n' +
    '        [totalQuestions]="totalQuestions"\n' +
    '        [questioncategorylist]="questioncategorylist"\n' +
    '        [questionlevellist]="questionlevellist"\n' +
    '        [filterCategoryValue]="filterCategoryValue"\n' +
    '        [filterDifficultyValue]="filterDifficultyValue"\n' +
    '        [editMode]="editMode"\n' +
    '        [addMode]="addMode"\n' +
    '        (filterParams)="filter($event)"\n' +
    '        (reset)="resetFullList()"></app-filter-questions-and-answers>'
})
export class TestHostComponent {
  questioncategorylist: ForeignKeyOptionsDTO[] = [];
  questionlevellist: ForeignKeyOptionsDTO[] = [];
  totalQuestions: number;
  filterCategoryValue: number;
  filterDifficultyValue: number;
  addMode:boolean = true;
  editMode:boolean = true;
  filterParams:FilterParamsDTO = null;
  isReset:boolean = false;
  public filter($event: FilterParamsDTO) {
    this.filterParams = $event;
  }
  public resetFullList() {
    this.isReset = true;
  }
}
describe('FilterQuestionsAndAnswersComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ FilterQuestionsAndAnswersComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'all @Input fields should populate', () => {
    component.questioncategorylist = [{ value : 0, viewValue : "Java" },
      {  value : 1, viewValue : "Python" },
      { value : 2, viewValue : "Scala" }];
    component.questionlevellist = [{ value : 0, viewValue : "EASY" },
      {  value : 1, viewValue : "MEDIUM" },
      { value : 2, viewValue : "HARD" }];
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    let dropdown1: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[0];
    let dropdown2: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[1];
    expect(dropdown1.length).toEqual(3);
    expect(dropdown2.length).toEqual(3);
  });
  it('select a category value only and then click submit', () => {
    component.questioncategorylist = [{ value : 0, viewValue : "Java" },
      {  value : 1, viewValue : "Python" },
      { value : 2, viewValue : "Scala" }];
    component.questionlevellist = [{ value : 0, viewValue : "EASY" },
      {  value : 1, viewValue : "MEDIUM" },
      { value : 2, viewValue : "HARD" }];
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    let dropdown1: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#category');
    dropdown1.value = dropdown1.options[2].value;
    dropdown1.dispatchEvent(new Event('change'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelector('#filterBtn');
    btn1.click();
    fixture.detectChanges();
    expect(+component.filterParams.filterCategoryValue).toEqual(2);
  });
  it('select a level value only and then click submit', () => {
    component.questioncategorylist = [{ value : 0, viewValue : "Java" },
      {  value : 1, viewValue : "Python" },
      { value : 2, viewValue : "Scala" }];
    component.questionlevellist = [{ value : 0, viewValue : "EASY" },
      {  value : 1, viewValue : "MEDIUM" },
      { value : 2, viewValue : "HARD" }];
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    let dropdown1: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#level');
    dropdown1.value = dropdown1.options[2].value;
    dropdown1.dispatchEvent(new Event('change'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelector('#filterBtn');
    btn1.click();
    fixture.detectChanges();
    expect(+component.filterParams.filterDifficultyValue).toEqual(2);
  });
  it('select a category value only and then click submit', () => {
    component.questioncategorylist = [{ value : 0, viewValue : "Java" },
      {  value : 1, viewValue : "Python" },
      { value : 2, viewValue : "Scala" }];
    component.questionlevellist = [{ value : 0, viewValue : "EASY" },
      {  value : 1, viewValue : "MEDIUM" },
      { value : 2, viewValue : "HARD" }];
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    let dropdown1: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#category');
    dropdown1.value = dropdown1.options[2].value;
    dropdown1.dispatchEvent(new Event('change'));
    let dropdown2: HTMLSelectElement = fixture.debugElement.nativeElement.querySelector('#level');
    dropdown2.value = dropdown2.options[2].value;
    dropdown2.dispatchEvent(new Event('change'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelector('#filterBtn');
    btn1.click();
    fixture.detectChanges();
    expect(+component.filterParams.filterCategoryValue).toEqual(2);
    expect(+component.filterParams.filterDifficultyValue).toEqual(2);
  });
  it('click the second button', () => {
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    const btn2: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    btn2.click();
    expect(component.isReset).toBeTrue();
  });
});
