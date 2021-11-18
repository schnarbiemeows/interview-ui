import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndAdminsListItemComponent } from './users-and-admins-list-item.component';

describe('UsersAndAdminsListItemComponent', () => {
  let component: UsersAndAdminsListItemComponent;
  let fixture: ComponentFixture<UsersAndAdminsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAndAdminsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndAdminsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
