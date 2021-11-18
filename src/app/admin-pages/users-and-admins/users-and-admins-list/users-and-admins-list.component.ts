import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";

@Component({
  selector: 'app-users-and-admins-list',
  templateUrl: './users-and-admins-list.component.html',
  styleUrls: ['./users-and-admins-list.component.css']
})
export class UsersAndAdminsListComponent implements OnInit {

  @Input() inteviewUserList: InterviewUserDTO[];
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
