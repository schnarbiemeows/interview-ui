import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsSidebarComponent } from './users-and-admins-sidebar.component';

describe('UsersAndAdminsSidebarComponent', () => {
  let component: UsersAndAdminsSidebarComponent;
  let fixture: ComponentFixture<UsersAndAdminsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
