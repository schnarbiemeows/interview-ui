import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InterviewUserDTOWrapper} from "../../../models/InterviewUserDTOWrapper";

@Component({
  selector: 'app-users-and-admins-sidebar',
  templateUrl: './users-and-admins-sidebar.component.html',
  styleUrls: ['./users-and-admins-sidebar.component.css']
})
export class UsersAndAdminsSidebarComponent implements OnInit {

  @Output() filterEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public emitFilter(val: number) {
    this.filterEvent.emit(val);
  }
}
