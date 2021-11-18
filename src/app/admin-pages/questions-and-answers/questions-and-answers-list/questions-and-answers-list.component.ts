import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";

@Component({
  selector: 'app-questions-and-answers-list',
  templateUrl: './questions-and-answers-list.component.html',
  styleUrls: ['./questions-and-answers-list.component.css']
})
export class QuestionsAndAnswersListComponent implements OnInit {

  @Input() questionAnswerList: QuestionAnswerItemDTO[];
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Input() isAdmin: boolean;
  @Input() isSuper: boolean;
  @Input() paginationDisabled: boolean;
  @Output() relayEdit = new EventEmitter<number>();
  @Output() relayDelete = new EventEmitter<number>();

  public pc: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public receiveAndRelayEdit(event:any) {
    console.log("relaying edit = " + event);
    this.relayEdit.emit(event);
  }

  public receiveAndRelayDelete(event:any) {
    console.log("relaying delete = " + event);
    this.relayDelete.emit(event);
  }
}
