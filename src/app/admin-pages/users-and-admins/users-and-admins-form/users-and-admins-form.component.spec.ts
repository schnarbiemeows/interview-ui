import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersAndAdminsFormComponent } from './users-and-admins-form.component';
import {Component} from "@angular/core";
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";
import {FormsModule} from "@angular/forms";
import {InterviewUserDTOWrapper} from "../../../models/InterviewUserDTOWrapper";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";

@Component({
  template: '<app-users-and-admins-form\n' +
    '          [item]="userItem"\n' +
    '          [editMode]="editMode"\n' +
    '          [addMode]="addMode"\n' +
    '          (cancelAction)="receiveFormCancel()"\n' +
    '          (saveAdd)="receiveFormSaveAdd($event)"\n' +
    '          (saveEdit)="receiveFormSaveEdit($event)"\n' +
    '          ></app-users-and-admins-form>'
})
export class TestHostComponent {
  userItem: InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
  dto:InterviewUserDTO = {
    userId: 1,
    authorizations:[],
    emailAddr: 'emailAddr',
    firstName: 'firstName',
    userActive: true,
    userNotLocked: true,
    joinDate: null,
    lastLoginDate: null,
    lastLoginDateDisplay: null,
    lastName: 'lastName',
    password: 'password',
    profileImage: 'profileImage',
    roles: '',
    userIdentifier: 'userIdentifier',
    userName: 'userName'
  };
  addMode:boolean = true;
  editMode:boolean = true;
  saveOrEditItem:InterviewUserDTOWrapper = null;
  cancelAction:boolean = false;
  public receiveFormSaveAdd($event: InterviewUserDTOWrapper) {
    this.saveOrEditItem = $event;
  }
  public receiveFormSaveEdit($event: InterviewUserDTOWrapper) {
    this.saveOrEditItem = $event;
  }
  public receiveFormCancel() {
    this.cancelAction = true;
  }
}
describe('UsersAndAdminsFormComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UsersAndAdminsFormComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.userItem.fromDto(component.dto);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it( 'all @Input fields should populate', () => {
    //fixture.detectChanges();
    const firstName: HTMLInputElement = fixture.nativeElement.querySelector('#firstName');
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const userName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const emailAddr: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];
    expect(firstName.value).toBe("firstName");
    expect(lastName.value).toBe("lastName");
    expect(userName.value).toBe("userName");
    expect(emailAddr.value).toBe("emailAddr");
  });
  it('ADD form filled out and submitted', () => {
    component.addMode = true;
    component.editMode = false;
    fixture.detectChanges();
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
    fixture.detectChanges();
    const firstName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const userName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const emailAddr: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];
    let roles: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[0];
    let userActive: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[1];
    let userNotLocked: HTMLSelectElement = fixture.debugElement.nativeElement.querySelectorAll('select')[2];
    fixture.detectChanges();
    firstName.value = 'firstName1';
    lastName.value = 'lastName1';
    userName.value = 'userName1';
    password.value = "password";
    emailAddr.value = 'emailAddr1';
    roles.value = roles.options[0].value;
    userActive.value = userActive.options[0].value;
    userNotLocked.value = userNotLocked.options[0].value;
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    userName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    emailAddr.dispatchEvent(new Event('input'));
    roles.dispatchEvent(new Event('change'));
    userActive.dispatchEvent(new Event('change'));
    userNotLocked.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const btn1: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    btn1.click();
    fixture.detectChanges();
    console.log()
    expect(component.saveOrEditItem.firstName).toEqual("firstName1");
    expect(component.saveOrEditItem.lastName).toEqual("lastName1");
    expect(component.saveOrEditItem.newUserName).toEqual("userName1");
    expect(component.saveOrEditItem.emailAddr).toEqual("emailAddr1");
    expect(component.saveOrEditItem.roles).toEqual('ROLE_BASIC_USER');
    expect(component.saveOrEditItem.userActive+"").toEqual("true");
    expect(component.saveOrEditItem.userNotLocked+"").toEqual("true");
  }
});
