import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {Component} from "@angular/core";
import {FormsModule} from "@angular/Forms";

@Component({
  template: '<app-search\n' +
    '        [placeholder]="sqlLvlSrchMsg"\n' +
    '        (searchTerm)="searchLevel($event)"\n' +
    '      ></app-search>'
})
export class TestHostComponent {
  sqlLvlSrchMsg: string = 'any';
  clicked:boolean = false;
  public searchLevel($event) {
    this.clicked = true;
  }
}
describe('SearchComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SearchComponent, TestHostComponent ]
    })
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all @Input fields should populate', () => {
    const sqlLvlSrchMsg: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(sqlLvlSrchMsg.placeholder).toBe(component.sqlLvlSrchMsg);
  });
  it('enter something into the input element', () => {
    const inputField: HTMLInputElement  = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
    inputField.value = 'XXX';
    inputField.dispatchEvent(new Event('input'));
    expect(component.clicked).toBeTrue();
  });
});
