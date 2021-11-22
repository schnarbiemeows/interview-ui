import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryListComponent } from './category-list.component';
import {Component} from "@angular/core";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  template: '<app-category-list [categorylist]="questioncategorylist"\n' +
    '         [addModeCategory]="addModeCategory"\n' +
    '         [addModeLevel]="addModeLevel"\n' +
    '         [editModeCategory]="editModeCategory"\n' +
    '         [editModeLevel]="editModeLevel"\n' +
    '         [isAdmin]="isAdmin"\n' +
    '         [isSuper]="isSuper"\n' +
    '         [paginationDisabledCategory]="paginationDisabledCategory"\n' +
    '         (relayEdit)="receiveAndRelayInitiateEditCategory($event)"\n' +
    '         (relayDelete)="receiveAndRelayDeleteCategory($event)"\n' +
    '      ></app-category-list>'
})
export class TestHostComponent {
  questioncategorylist:QuestionCategoryDTO[] = [{
    questionCategoryId: 0,
    questionCategoryDesc: 'description',
    evntTmestmp: null,
    evntOperId: '',
    displayCde: 'code'
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
  public receiveAndRelayInitiateEditCategory($event: number) {
    this.editNum = $event;
  }
  public receiveAndRelayDeleteCategory($event: number) {
    this.deleteNum = $event;
  }
}
describe('CategoryListComponent', () => {
  let component: CategoryListComponent
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[NgxPaginationModule],
      declarations: [ CategoryListComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(CategoryListComponent);
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
