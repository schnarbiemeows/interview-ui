import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsAndAnswersListComponent } from './questions-and-answers-list.component';
import {Component} from "@angular/core";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {QuestionDTO} from "../../../models/QuestionDTO";
import {AnswerDto} from "../../../models/answer-dto";
import {LevelListComponent} from "../../categories-and-levels/level-list/level-list.component";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  template: '<app-questions-and-answers-list\n' +
    '          [questionAnswerList]="questionAnswerlist"\n' +
    '          [paginationDisabled]="paginationDisabled"\n' +
    '          [isAdmin]="isAdmin"\n' +
    '          [isSuper]="isSuper"\n' +
    '          [editMode]="editMode"\n' +
    '          [addMode]="addMode"\n' +
    '          (relayEdit)="editItem($event)"\n' +
    '          (relayDelete)="deleteItem($event)"\n' +
    '        ></app-questions-and-answers-list>'
})
export class TestHostComponent {
  questionAnswerlist:QuestionAnswerItemDTO[] = [new QuestionAnswerItemDTO()];
  addModeCategory:boolean = true;
  editModeCategory:boolean = true;
  addModeLevel:boolean = true;
  editModeLevel:boolean = true;
  isAdmin:boolean = true;
  isSuper:boolean = true;
  paginationDisabledCategory:boolean = false;
  editNum:number = null;
  deleteNum:number = null;
  public receiveAndRelayInitiateEditCategory($event: number) {
    this.editNum = $event;
  }
  public receiveAndRelayDeleteCategory($event: number) {
    this.deleteNum = $event;
  }
}
describe('QuestionsAndAnswersListComponent', () => {
  let component: QuestionsAndAnswersListComponent
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<QuestionsAndAnswersListComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[NgxPaginationModule],
      declarations: [ QuestionsAndAnswersListComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(QuestionsAndAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });
  it('should pass out an index to be edited', () => {
    component.receiveAndRelayEdit(1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });
  it('should pass out an index to be deleted', () => {
    component.receiveAndRelayDelete(1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });
});
