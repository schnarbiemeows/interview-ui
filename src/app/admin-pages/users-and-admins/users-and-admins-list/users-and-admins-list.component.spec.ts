import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsListComponent } from './users-and-admins-list.component';

describe('UsersAndAdminsListComponent', () => {
  let component: UsersAndAdminsListComponent;
  let fixture: ComponentFixture<UsersAndAdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
