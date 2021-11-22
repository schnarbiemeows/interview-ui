import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsListItemComponent } from './users-and-admins-list-item.component';
import {Component} from "@angular/core";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";

@Component({
  template: '<app-users-and-admins-list-item\n' +
    '              [i]="i"\n' +
    '              [item]="dto"\n' +
    '              [pc]="pc"\n' +
    '              [addMode]="addMode"\n' +
    '              [editMode]="editMode"\n' +
    '              [isAdmin]="isAdmin"\n' +
    '              [isSuper]="isSuper"\n' +
    '              (onEdit)="receiveAndRelayEdit($event)"\n' +
    '              (onDelete)="receiveAndRelayDelete($event)">\n' +
    '            </app-users-and-admins-list-item>'
})
export class TestHostComponent {
  i = 0;
  pc:10;
  dto: InterviewUserDTO = {
    userId: 0,
    authorizations: [],
    emailAddr: 'emailAddr',
    firstName: 'firstName',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lastName',
    password: '',
    profileImage: '',
    roles: '',
    userIdentifier: 'userIdentifier',
    userName: 'userName'
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
describe('UsersAndAdminsListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsListItemComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('the string fields should have contents', () => {
    const emailAddr: HTMLElement = fixture.nativeElement.querySelectorAll('div')[3];
    expect(emailAddr.textContent).toBe(component.dto.emailAddr);
    const firstName: HTMLElement = fixture.nativeElement.querySelectorAll('div')[1];
    expect(firstName.textContent).toBe(component.dto.firstName);
    const lastName: HTMLElement = fixture.nativeElement.querySelectorAll('div')[2];
    expect(lastName.textContent).toBe(component.dto.lastName);
    const userIdentifier: HTMLElement = fixture.nativeElement.querySelectorAll('div')[5];
    expect(userIdentifier.textContent).toBe(component.dto.userIdentifier);
    const userName: HTMLElement = fixture.nativeElement.querySelectorAll('div')[4];
    expect(userName.textContent).toBe(component.dto.userName);
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
