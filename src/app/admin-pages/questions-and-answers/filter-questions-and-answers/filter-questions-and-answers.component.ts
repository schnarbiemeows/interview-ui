import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";

@Component({
  selector: 'app-filter-questions-and-answers',
  templateUrl: './filter-questions-and-answers.component.html',
  styleUrls: ['./filter-questions-and-answers.component.css']
})
export class FilterQuestionsAndAnswersComponent implements OnInit {

  @Input() totalQuestions: number;
  @Input() questioncategorylist: ForeignKeyOptionsDTO[];
  @Input() questionlevellist: ForeignKeyOptionsDTO[];
  @Input() filterCategoryValue: number = null;
  @Input() filterDifficultyValue: number = null;
  @Input() editMode: boolean;
  @Input() addMode: boolean;
  @Output() filterParams = new EventEmitter<FilterParamsDTO>();
  @Output() reset = new EventEmitter<void>();
  @Output() input1 = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    console.log("XXX category = " + this.filterCategoryValue + " , level = " + this.filterDifficultyValue);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  public filter() {
    console.log("filter action filter");
    console.log("category = " + this.filterCategoryValue + " , level = " + this.filterDifficultyValue);
    let filterParams: FilterParamsDTO = {
      filterCategoryValue: this.filterCategoryValue,
      filterDifficultyValue: this.filterDifficultyValue
    }
    this.filterParams.emit(filterParams);
  }

  public resetFullList() {
    console.log("filter action cancelled");
    this.filterCategoryValue = null;
    this.filterDifficultyValue = null;
    this.reset.emit();
  }
}
