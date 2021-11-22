import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmailSentComponent } from './register-email-sent.component';
import {HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";

describe('RegisterEmailSentComponent', () => {
  let component: RegisterEmailSentComponent;
  let fixture: ComponentFixture<RegisterEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RegisterEmailSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
