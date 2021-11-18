import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsFormComponent } from './users-and-admins-form.component';

describe('UsersAndAdminsFormComponent', () => {
  let component: UsersAndAdminsFormComponent;
  let fixture: ComponentFixture<UsersAndAdminsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
