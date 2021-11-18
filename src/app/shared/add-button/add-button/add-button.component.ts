import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  @Input() editMode1: boolean;
  @Input() addMode1: boolean;
  @Input() editMode2: boolean;
  @Input() addMode2: boolean;
  @Input() btnMsg: string;
  @Input() action: string;
  @Output() onEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  initiateAction() {
    console.log("clicked");
    this.onEvent.emit();
  }
}
