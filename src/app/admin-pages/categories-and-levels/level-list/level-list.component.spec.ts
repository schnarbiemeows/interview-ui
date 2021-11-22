import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelListComponent } from './level-list.component';
import {Component} from "@angular/core";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {NgxPaginationModule} from "ngx-pagination";
@Component({
  template: '<app-level-list\n' +
    '        [levelList]="questionlevellist"\n' +
    '        [addModeCategory]="addModeCategory"\n' +
    '        [addModeLevel]="addModeLevel"\n' +
    '        [editModeCategory]="editModeCategory"\n' +
    '        [editModeLevel]="editModeLevel"\n' +
    '        [isAdmin]="isAdmin"\n' +
    '        [isSuper]="isSuper"\n' +
    '        (relayEdit)="receiveAndRelayInitiateEditLevel($event)"\n' +
    '        (relayDelete)="receiveAndRelayDeleteLevel($event)"\n' +
    '      ></app-level-list>'
})
export class TestHostComponent {
  questionlevellist:QuestionLevelDTO[] = [{
    questionLevelId: 1,
    questionLevelDesc: "EASY",
    evntTmestmp: null,
    evntOperId: "admin"
  }];
  addModeCategory:boolean = true;
  editModeCategory:boolean = true;
  addModeLevel:boolean = true;
  editModeLevel:boolean = true;
  isAdmin:boolean = true;
  isSuper:boolean = true;
  paginationDisabledCategory:boolean = false;
  editNum:number = null;
  deleteNum:number = null;
  public receiveAndRelayInitiateEditLevel($event: number) {
    this.editNum = $event;
  }
  public receiveAndRelayDeleteLevel($event: number) {
    this.deleteNum = $event;
  }
}
describe('LevelListComponent', () => {
  let component: LevelListComponent
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<LevelListComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[NgxPaginationModule],
      declarations: [ LevelListComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(LevelListComponent);
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
