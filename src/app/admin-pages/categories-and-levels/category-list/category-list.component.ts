import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @Input() categorylist: QuestionCategoryDTO[];
  @Input() editModeCategory: boolean;
  @Input() addModeCategory: boolean;
  @Input() editModeLevel: boolean;
  @Input() addModeLevel: boolean;
  @Input() isAdmin: boolean;
  @Input() isSuper: boolean;
  @Input() paginationDisabledCategory: boolean;
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
