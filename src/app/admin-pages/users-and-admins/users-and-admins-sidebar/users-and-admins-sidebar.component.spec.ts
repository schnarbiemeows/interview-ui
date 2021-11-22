import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsSidebarComponent } from './users-and-admins-sidebar.component';
import {Component} from "@angular/core";
@Component({
  template: '<app-users-and-admins-sidebar\n' +
  '(filterEvent)="receiveFilterRequest($event)">\n' +
    '</app-users-and-admins-sidebar>'
})
export class TestHostComponent {
  value: number;
  public receiveFilterRequest($event: number) {
    this.value =  $event;
  }
}
describe('UsersAndAdminsSidebarComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsSidebarComponent, TestHostComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('click the first item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[0];
    btn.click();
    expect(component.value).toEqual(0);
  });
  it('click the second item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[1];
    btn.click();
    expect(component.value).toEqual(1);
  });
  it('click the third item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[2];
    btn.click();
    expect(component.value).toEqual(2);
  });
  it('click the fourth item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[3];
    btn.click();
    expect(component.value).toEqual(3);
  });
  it('click the fifth item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[4];
    btn.click();
    expect(component.value).toEqual(4);
  });
  it('click the sixth item', () => {
    fixture.detectChanges();
    const btn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('a')[5];
    btn.click();
    expect(component.value).toEqual(5);
  });
});
