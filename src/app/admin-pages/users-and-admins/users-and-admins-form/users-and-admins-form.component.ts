import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewUserDTOWrapper} from "../../../models/InterviewUserDTOWrapper";

@Component({
  selector: 'app-users-and-admins-form',
  templateUrl: './users-and-admins-form.component.html',
  styleUrls: ['./users-and-admins-form.component.css']
})
export class UsersAndAdminsFormComponent implements OnInit {

  @Input() item: InterviewUserDTOWrapper;
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<InterviewUserDTOWrapper>();
  @Output() saveEdit = new EventEmitter<InterviewUserDTOWrapper>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(e) {
    e.preventDefault();
  }

  saveAddOrEdit() {
    if(this.addMode==true) {
      console.log("adding question-answer action");
      this.saveAdd.emit(this.item);
    } else {
      console.log("editing question-answer action");
      this.saveEdit.emit(this.item);
    }
  }

  public cancel() {
    console.log("question-answer action cancelled");
    this.cancelAction.emit();
  }
}
