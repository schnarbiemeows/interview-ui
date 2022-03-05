import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  @Input() levelList: QuestionLevelDTO[];
  @Input() editModeCategory: boolean;
  @Input() addModeCategory: boolean;
  @Input() editModeLevel: boolean;
  @Input() addModeLevel: boolean;
  @Input() isAdmin: boolean;
  @Input() isSuper: boolean;
  @Output() relayEdit = new EventEmitter<number>();
  @Output() relayDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  public receiveAndRelayEdit(event:any) {
    this.relayEdit.emit(event);
  }

  public receiveAndRelayDelete(event:any) {
    this.relayDelete.emit(event);
  }
}
