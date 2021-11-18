import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";

@Component({
  selector: 'app-questions-and-answers-list-item',
  templateUrl: './questions-and-answers-list-item.component.html',
  styleUrls: ['./questions-and-answers-list-item.component.css']
})
export class QuestionsAndAnswersListItemComponent implements OnInit {

  public alwaysHidden:boolean = true;
  public itemsPerPage:number = 10;
  @Input() i: number;
  @Input() pc: number;
  @Input() item: QuestionAnswerItemDTO;
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Input() isAdmin: boolean;
  @Input() isSuper: boolean;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  editItem(param: any) {
    console.log("edit question-answer item " + param + " clicked!");
    this.onEdit.emit(param);
  }

  deleteItem(param: any) {
    console.log("delete question-answer item " + this.i + " clicked!");
    this.onDelete.emit(param);
  }
}
