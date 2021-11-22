import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFormComponent } from './category-form.component';
import {Component} from "@angular/core";
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {FormsModule} from "@angular/forms";

@Component({
  template: '<app-category-form\n' +
    '            [item]="categoryItem"\n' +
    '            [addModeCategory]="addModeCategory"\n' +
    '            [addModeLevel]="addModeLevel"\n' +
    '            [editModeCategory]="editModeCategory"\n' +
    '            [editModeLevel]="editModeLevel"\n' +
    '            (saveAdd)="receiveCategoryFormSaveAdd($event)"\n' +
    '            (saveEdit)="receiveCategoryFormSaveEdit($event)"\n' +
    '            (cancelAction)="receiveCategoryFormCancel($event)"\n' +
    '          ></app-category-form>'
})
export class TestHostComponent {
  categoryItem:QuestionCategoryDTO = {
    questionCategoryId: 0,
    questionCategoryDesc: 'description',
    evntTmestmp: null,
    evntOperId: '',
    displayCde: 'Y'
  };
  addModeCategory:boolean = true;
  editModeCategory:boolean = true;
  addModeLevel:boolean = true;
  editModeLevel:boolean = true;
  saveOrEditItem:QuestionCategoryDTO = null;
  cancelAction:boolean = false;
  public receiveCategoryFormSaveAdd($event: QuestionCategoryDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveCategoryFormSaveEdit($event: QuestionCategoryDTO) {
    this.saveOrEditItem = $event;
  }
  public receiveCategoryFormCancel() {
    this.cancelAction = true;
  }
}
describe('CategoryFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ CategoryFormComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'all @Input fields should populate', () => {
    const questionCategoryDesc: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    expect(questionCategoryDesc.value).toBe("description");
    const displayCde: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    expect(displayCde.value).toBe("Y");
  });
  it('ADD form filled out and submitted', () => {
    component.addModeCategory = true;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const questionCategoryDesc: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[0];
    const displayCde: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[1];
    fixture.detectChanges();
    questionCategoryDesc.value = 'YYY';
    displayCde.value = "N";
    displayCde.dispatchEvent(new Event('input'));
    questionCategoryDesc.dispatchEvent(new Event('input'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    expect(component.saveOrEditItem.questionCategoryDesc).toEqual("YYY");
    expect(component.saveOrEditItem.displayCde).toEqual("N");
  });
  it('EDIT form filled out and submitted', () => {
    component.addModeCategory = false;
    component.editModeCategory = true;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const questionCategoryDesc: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[0];
    const displayCde: HTMLInputElement  = fixture.nativeElement.querySelectorAll('input')[1];
    fixture.detectChanges();
    questionCategoryDesc.value = 'YYY';
    displayCde.value = "N";
    displayCde.dispatchEvent(new Event('input'));
    questionCategoryDesc.dispatchEvent(new Event('input'));
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    expect(component.saveOrEditItem.questionCategoryDesc).toEqual("YYY");
    expect(component.saveOrEditItem.displayCde).toEqual("N");
  });
  it('CANCEL form clicked', () => {
    component.addModeCategory = true;
    component.editModeCategory = true;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const btnCancel: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    btnCancel.click();
    fixture.detectChanges();
    expect(component.cancelAction).toBeTrue();
  });
});
