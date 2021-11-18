import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";

@Component({
  selector: 'app-questions-and-answers-form',
  templateUrl: './questions-and-answers-form.component.html',
  styleUrls: ['./questions-and-answers-form.component.css']
})
export class QuestionsAndAnswersFormComponent implements OnInit {

  @Input() item: QuestionAnswerItemDTO;
  @Input() questioncategorylist: ForeignKeyOptionsDTO[];
  @Input() questionlevellist: ForeignKeyOptionsDTO[];
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<QuestionAnswerItemDTO>();
  @Output() saveEdit = new EventEmitter<QuestionAnswerItemDTO>();

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
