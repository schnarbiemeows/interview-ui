import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAndAnswersListItemComponent } from './questions-and-answers-list-item.component';
import {Component} from "@angular/core";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {QuestionDTO} from "../../../models/QuestionDTO";
import {AnswerDto} from "../../../models/answer-dto";

@Component({
  template: '<app-questions-and-answers-list-item\n' +
    '            [i]="i"\n' +
    '            [item]="dto"\n' +
    '            [pc]="pc"\n' +
    '            [addMode]="addMode"\n' +
    '            [editMode]="editMode"\n' +
    '            [isAdmin]="isAdmin"\n' +
    '            [isSuper]="isSuper"\n' +
    '            (onEdit)="receiveAndRelayEdit($event)"\n' +
    '            (onDelete)="receiveAndRelayDelete($event)"\n' +
    '          ></app-questions-and-answers-list-item>'
})
export class TestHostComponent {
  i = 0;
  dto: QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
  newQuestion:QuestionDTO = {
    questionCategoryId: 5,
    questionLevelId: 1,
    questionTxt: "how do you replace a word in a file with another word?",
    evntTmestmp: null,
    evntOperId: "schnarbiemeows"
  };
  newAnswer:AnswerDto = {
    answerTxt: 'use the sed command - sed s/x/y/g <file name>',
    evntTmestmp: null,
    evntOperId: 'schnarbiemeows'
  };
  addMode:boolean = true;
  editMode:boolean = true;
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

describe('QuestionsAndAnswersListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    // @ts-ignore
    //this.dto.fromDtos(this.newQuestion,this.newAnswer);
    await TestBed.configureTestingModule({
      declarations: [ QuestionsAndAnswersListItemComponent, TestHostComponent ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('both buttons should be disabled', () => {
    let btn1disabled: boolean = fixture.debugElement.nativeElement.querySelectorAll('button')[0].disabled;
    expect(btn1disabled).toBeTrue();
    let btn2disabled: boolean = fixture.debugElement.nativeElement.querySelectorAll('button')[1].disabled;
    expect(btn2disabled).toBeTrue();
  });
  it('both buttons should be enabled', () => {
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    const btn1disabled: boolean  = fixture.debugElement.nativeElement.querySelectorAll('button')[0].disabled;
    expect(btn1disabled).toBeFalse();
    const btn2disabled: boolean = fixture.debugElement.nativeElement.querySelectorAll('button')[1].disabled;
    expect(btn2disabled).toBeFalse();
  });
  it('first buttons should be visible, second one should not', () => {
    component.addMode = false;
    component.editMode = false;
    component.isAdmin = true;
    component.isSuper = false;
    fixture.detectChanges();
    const btnlist = fixture.nativeElement.querySelectorAll('button');
    expect(btnlist.length).toEqual(1);
  });
  it('click the first button', () => {
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    expect(component.isEdit).toBeTrue();
  });
  it('click the second button', () => {
    component.addMode = false;
    component.editMode = false;
    fixture.detectChanges();
    const btn2: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    btn2.click();
    expect(component.isDelete).toBeTrue();
  });
});
