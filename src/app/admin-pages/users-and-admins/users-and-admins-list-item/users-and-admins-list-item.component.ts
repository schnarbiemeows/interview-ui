import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";

@Component({
  selector: 'app-users-and-admins-list-item',
  templateUrl: './users-and-admins-list-item.component.html',
  styleUrls: ['./users-and-admins-list-item.component.css']
})
export class UsersAndAdminsListItemComponent implements OnInit {

  public alwaysHidden:boolean = true;
  public itemsPerPage:number = 10;
  @Input() i: number;
  @Input() pc: number;
  @Input() item: InterviewUserDTO;
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
    console.log("edit interview-user item " + param + " clicked!");
    this.onEdit.emit(param);
  }

  deleteItem(param: any) {
    console.log("delete interview-user item " + this.i + " clicked!");
    this.onDelete.emit(param);
  }

}
