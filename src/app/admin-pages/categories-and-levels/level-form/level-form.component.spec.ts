import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelFormComponent } from './level-form.component';
import {Component} from "@angular/core";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {FormsModule} from "@angular/forms";

@Component({
  template: '<app-level-form\n' +
    '            [item]="levelItem"\n' +
    '            [addModeCategory]="addModeCategory"\n' +
    '            [addModeLevel]="addModeLevel"\n' +
    '            [editModeCategory]="editModeCategory"\n' +
    '            [editModeLevel]="editModeLevel"\n' +
    '            (saveAdd)="receiveLevelFormSaveAdd($event)"\n' +
    '            (saveEdit)="receiveLevelFormSaveEdit($event)"\n' +
    '            (cancelAction)="receiveLevelFormCancel($event)"\n' +
    '          ></app-level-form>'
})
export class TestHostComponent {
  levelItem:QuestionLevelDTO = {
    questionLevelId: 0,
    questionLevelDesc: 'description',
    evntTmestmp: null,
    evntOperId: ''
  };
  addModeCategory:boolean = true;
  editModeCategory:boolean = true;
  addModeLevel:boolean = true;
  editModeLevel:boolean = true;
  saveOrEditItem:QuestionLevelDTO = null;
  cancelAction:boolean = false;
  public receiveLevelFormSaveAdd($event: QuestionLevelDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveLevelFormSaveEdit($event: QuestionLevelDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveLevelFormCancel() {
    this.cancelAction = true;
  }
}
describe('LevelFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LevelFormComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'all @Input fields should populate', () => {
    const questionLevelDesc: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    expect(questionLevelDesc.value).toBe("description");
  });
  it('ADD form filled out and submitted', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = true;
    component.editModeLevel = false;
    fixture.detectChanges();
    const questionLevelDesc: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[0];
    fixture.detectChanges();
    questionLevelDesc.value = 'YYY';
    questionLevelDesc.dispatchEvent(new Event('input'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    expect(component.saveOrEditItem.questionLevelDesc).toEqual("YYY");
  });
  it('EDIT form filled out and submitted', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = true;
    fixture.detectChanges();
    const questionLevelDesc: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[0];
    fixture.detectChanges();
    questionLevelDesc.value = 'YYY';
    questionLevelDesc.dispatchEvent(new Event('input'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    expect(component.saveOrEditItem.questionLevelDesc).toEqual("YYY");
  });
  it('CANCEL form clicked', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = true;
    component.editModeLevel = true;
    fixture.detectChanges();
    const btnCancel: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    btnCancel.click();
    fixture.detectChanges();
    expect(component.cancelAction).toBeTrue();
  });
});
