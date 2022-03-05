import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";

@Component({
  selector: 'app-level-list-item',
  templateUrl: './level-list-item.component.html',
  styleUrls: ['./level-list-item.component.css']
})
export class LevelListItemComponent implements OnInit {

  public alwaysHidden:boolean = true;
  @Input() i: number;
  @Input() item: QuestionLevelDTO;
  @Input() editModeCategory: boolean;
  @Input() addModeCategory: boolean;
  @Input() editModeLevel: boolean;
  @Input() addModeLevel: boolean;
  @Input() isAdmin: boolean;
  @Input() isSuper: boolean;
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  editLevelItem(param: any) {
    this.onEdit.emit(param);
  }

  deleteLevelItem(param: any) {
    this.onDelete.emit(param);
  }
}
