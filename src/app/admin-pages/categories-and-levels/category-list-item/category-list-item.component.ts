import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";

@Component({
  selector: 'app-category-list-item',
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent implements OnInit {

  public alwaysHidden:boolean = true;
  public itemsPerPage:number = 10;
  @Input() i: number;
  @Input() pc: number;
  @Input() item: QuestionCategoryDTO;
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

  editCategoryItem(param: any) {
    console.log("edit category item " + param + " clicked!");
    this.onEdit.emit(param);
  }

  deleteCategoryItem(param: any) {
    console.log("delete category item " + this.i + " clicked!");
    this.onDelete.emit(param);
  }
}
