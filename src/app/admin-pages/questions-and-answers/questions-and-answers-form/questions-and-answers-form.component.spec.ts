import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAndAnswersFormComponent } from './questions-and-answers-form.component';
import {Component} from "@angular/core";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FormsModule} from "@angular/forms";
import {QuestionDTO} from "../../../models/QuestionDTO";
import {AnswerDTO} from "../../../models/AnswerDTO";

@Component({
  template: '<app-questions-and-answers-form\n' +
    '            [item]="questionAnswerItem"\n' +
    '            [questioncategorylist]="questionCategoryFormList"\n' +
    '            [questionlevellist]="questionLevelFormList"\n' +
    '            [editMode]="editMode"\n' +
    '            [addMode]="addMode"\n' +
    '            (cancelAction)="receiveFormCancel()"\n' +
    '            (saveAdd)="receiveFormSaveAdd($event)"\n' +
    '            (saveEdit)="receiveFormSaveEdit($event)"\n' +
    '          ></app-questions-and-answers-form>'
})
export class TestHostComponent {
  questionAnswerItem:QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
  question:QuestionDTO = {
    questionCategoryId: 5,
    questionLevelId: 1,
    answerId: 63,
    questionTxt: "questionTxt",
    evntTmestmp: null,
    evntOperId: "schnarbiemeows"
  };
  answer:AnswerDTO = {
    answerTxt: "answerTxt",
    evntTmestmp: null,
    evntOperId: 'schnarbiemeows'
  };
  questionCategoryFormList: ForeignKeyOptionsDTO[] = [];
  questionLevelFormList: ForeignKeyOptionsDTO[] = [];
  addMode:boolean = true;
  editMode:boolean = true;
  saveOrEditItem:QuestionAnswerItemDTO = null;
  cancelAction:boolean = false;
  public receiveFormSaveAdd($event: QuestionAnswerItemDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveFormSaveEdit($event: QuestionAnswerItemDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveFormCancel() {
    this.cancelAction = true;
  }
}
describe('QuestionsAndAnswersFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ QuestionsAndAnswersFormComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.questionAnswerItem.fromDtos(component.question,component.answer);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'all @Input fields should populate', () => {
    console.log("questionAnswerItem. = " + component.questionAnswerItem.questionTxt );
    const questionTxt: HTMLInputElement = fixture.nativeElement.querySelector('#questionTxt');
    const answerTxt: HTMLInputElement  = fixture.nativeElement.querySelector('#answerTxt');
    expect(questionTxt.value).toBe("questionTxt");
    expect(answerTxt.value).toBe("answerTxt");
  });
  it('ADD form filled out and submitted', () => {
    component.addMode = true;
    component.editMode = false;
    process();
  });
  it('EDIT form filled out and submitted', () => {
    component.addMode = false;
    component.editMode = true;
    process();
  });
  it('CANCEL form clicked', () => {
    component.addMode = true;
    component.editMode = true;
    fixture.detectChanges();
    const btnCancel: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    btnCancel.click();
    fixture.detectChanges();
    expect(component.cancelAction).toBeTrue();
  });
  function process() {
    component.questionCategoryFormList = [{ value : 0, viewValue : "Java" },
      {  value : 1, viewValue : "Python" },
      { value : 2, viewValue : "Scala" }];
    component.questionLevelFormList = [{ value : 0, viewValue : "EASY" },
      {  value : 1, viewValue : "MEDIUM" },
      { value : 2, viewValue : "HARD" }];
    fixture.detectChanges();
    let questionCategoryId: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[0];
    let questionLevelId: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[1];
    const questionTxt: HTMLInputElement  = fixture.nativeElement.querySelector('#questionTxt');
    const answerTxt: HTMLInputElement  = fixture.nativeElement.querySelector('#answerTxt');
    fixture.detectChanges();
    questionTxt.value = 'questionTxt1';
    answerTxt.value = 'answerTxt1';
    questionCategoryId.value = questionCategoryId.options[0].value;
    questionLevelId.value = questionLevelId.options[0].value;
    questionCategoryId.dispatchEvent(new Event('change'));
    questionLevelId.dispatchEvent(new Event('change'));
    questionTxt.dispatchEvent(new Event('input'));
    answerTxt.dispatchEvent(new Event('input'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    expect(component.saveOrEditItem.questionTxt).toEqual("questionTxt1");
    expect(component.saveOrEditItem.answerTxt).toEqual("answerTxt1");
    expect(+component.saveOrEditItem.questionCategoryId).toEqual(0);
    expect(+component.saveOrEditItem.questionLevelId).toEqual(0);
  }
});
