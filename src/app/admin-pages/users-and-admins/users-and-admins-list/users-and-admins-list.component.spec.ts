import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersAndAdminsListComponent } from './users-and-admins-list.component';
import {Component} from "@angular/core";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";
import {LevelListComponent} from "../../categories-and-levels/level-list/level-list.component";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  template: '<app-users-and-admins-list\n' +
    '          [inteviewUserList]="userlist"\n' +
    '          [paginationDisabled]="paginationDisabled"\n' +
    '          [isAdmin]="isAdmin"\n' +
    '          [isSuper]="isSuper"\n' +
    '          [editMode]="editMode"\n' +
    '          [addMode]="addMode"\n' +
    '          (relayEdit)="editItem($event)"\n' +
    '          (relayDelete)="deleteItem($event)"\n' +
    '        ></app-users-and-admins-list>'
})
export class TestHostComponent {
  user:InterviewUserDTO = {

  };
  userlist:InterviewUserDTO[] = [this.user];
  addMode:boolean = true;
  editMode:boolean = true;
  isAdmin:boolean = true;
  isSuper:boolean = true;
  paginationDisabled:boolean = false;
  editNum:number = null;
  deleteNum:number = null;
  public editItem($event: number) {
    this.editNum = $event;
  }
  public deleteItem($event: number) {
    this.deleteNum = $event;
  }
}
describe('UsersAndAdminsListComponent', () => {
  let component: UsersAndAdminsListComponent
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<UsersAndAdminsListComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[NgxPaginationModule],
      declarations: [ UsersAndAdminsListComponent,TestHostComponent ]
    })
    fixture = TestBed.createComponent(UsersAndAdminsListComponent);
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
