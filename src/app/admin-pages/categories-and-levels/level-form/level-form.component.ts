import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";

@Component({
  selector: 'app-level-form',
  templateUrl: './level-form.component.html',
  styleUrls: ['./level-form.component.css']
})
export class LevelFormComponent implements OnInit {

  @Input() item: QuestionLevelDTO;
  @Input() editModeCategory: boolean;
  @Input() addModeCategory: boolean;
  @Input() editModeLevel: boolean;
  @Input() addModeLevel: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<QuestionLevelDTO>();
  @Output() saveEdit = new EventEmitter<QuestionLevelDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(e) {
    e.preventDefault();
  }

  saveAddOrEdit() {
    if(this.addModeLevel==true) {
      console.log("saving Level action");
      this.saveAdd.emit(this.item);
    } else {
      console.log("editing Level action");
      this.saveEdit.emit(this.item);
    }
  }

  public cancel() {
    console.log("Level action cancelled");
    this.cancelAction.emit();
  }
}
