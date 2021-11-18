import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListItemComponent } from './category-list-item.component';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {Component} from "@angular/core";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {LevelListItemComponent} from "../level-list-item/level-list-item.component";
import {By} from "@angular/platform-browser";

@Component({
  template: '<app-category-list-item\n' +
    '          [i]="i"\n' +
    '          [item]="dto"\n' +
    '          [pc]="pc"\n' +
    '          [addModeCategory]="addModeCategory"\n' +
    '          [addModeLevel]="addModeLevel"\n' +
    '          [editModeCategory]="editModeCategory"\n' +
    '          [editModeLevel]="editModeLevel"\n' +
    '          [isAdmin]="isAdmin"\n' +
    '          [isSuper]="isSuper"\n' +
    '          (onEdit)="receiveAndRelayEdit($event)"\n' +
    '          (onDelete)="receiveAndRelayDelete($event)"\n' +
    '        >\n' +
    '        </app-category-list-item>'
})
export class TestHostComponent {
  i = 0;
  dto:QuestionCategoryDTO = {
    questionCategoryId: 0,
    questionCategoryDesc: 'description',
    evntTmestmp: null,
    evntOperId: '',
    displayCde: 'code'
  };
  addModeCategory:boolean = true;
  editModeCategory:boolean = true;
  addModeLevel:boolean = true;
  editModeLevel:boolean = true;
  isAdmin:boolean = true;
  isSuper:boolean = true;
  isEdit:boolean = false;
  isDelete:boolean = false;
  public receiveAndRelayEdit($event: boolean) {
    this.isEdit = true;
  }
  public receiveAndRelayDelete($event: boolean) {
    this.isDelete = true;
  }
}

describe('CategoryListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListItemComponent, TestHostComponent ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('questionCategoryDesc and displayCde should have contents', () => {
    // this works, I know
    const descriptionDisplay: HTMLElement = fixture.nativeElement.querySelectorAll('div')[0];
    console.log("descriptionDisplay.textContent = " + descriptionDisplay.textContent);
    expect(descriptionDisplay.textContent).toBe(component.dto.questionCategoryDesc);
    const codeDisplay: HTMLElement = fixture.nativeElement.querySelectorAll('div')[1];
    console.log("displayCde.textContent = " + codeDisplay.textContent);
    expect(codeDisplay.textContent).toBe(component.dto.displayCde);
  });
  it('both buttons should be disabled', () => {
    let btn1disabled: boolean = fixture.debugElement.nativeElement.querySelector('#btn1').disabled;
    expect(btn1disabled).toBeTrue();
    let btn2disabled: boolean = fixture.debugElement.nativeElement.querySelector('#btn2').disabled;
    expect(btn2disabled).toBeTrue();
  });
  it('both buttons should be enabled', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const btn1disabled: boolean  = fixture.debugElement.nativeElement.querySelector('#btn1').disabled;
    expect(btn1disabled).toBeFalse();
    const btn2disabled: boolean = fixture.debugElement.nativeElement.querySelector('#btn2').disabled;
    expect(btn2disabled).toBeFalse();
  });
  it('first buttons should be visible, second one should not', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = false;
    component.isAdmin = true;
    component.isSuper = false;
    fixture.detectChanges();
    const btn1disabled = fixture.debugElement.query(By.css('#btn1'));
    expect(btn1disabled).toBeTruthy();
    const btn2disabled = fixture.debugElement.query(By.css('#btn2'));
    expect(btn2disabled).toBeFalsy();
  });
  it('click the first button', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelector('#btn1');
    btn1.click();
    expect(component.isEdit).toBeTrue();
  });
  it('click the second button', () => {
    component.addModeCategory = false;
    component.editModeCategory = false;
    component.addModeLevel = false;
    component.editModeLevel = false;
    fixture.detectChanges();
    const btn2: HTMLButtonElement = fixture.nativeElement.querySelector('#btn2');
    btn2.click();
    expect(component.isDelete).toBeTrue();
  });
});
