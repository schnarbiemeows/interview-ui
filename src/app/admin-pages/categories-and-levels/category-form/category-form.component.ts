import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() item: QuestionCategoryDTO;
  @Input() editModeCategory: boolean;
  @Input() addModeCategory: boolean;
  @Input() editModeLevel: boolean;
  @Input() addModeLevel: boolean;
  @Output() cancelAction = new EventEmitter<void>();
  @Output() saveAdd = new EventEmitter<QuestionCategoryDTO>();
  @Output() saveEdit = new EventEmitter<QuestionCategoryDTO>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(e) {
    e.preventDefault();
  }

  saveAddOrEdit() {
    if(this.addModeLevel==true) {
      console.log("saving category action");
      this.saveAdd.emit(this.item);
    } else {
      console.log("editing category action");
      this.saveEdit.emit(this.item);
    }
  }

  public cancel() {
    console.log("category action cancelled");
    this.cancelAction.emit();
  }
}
