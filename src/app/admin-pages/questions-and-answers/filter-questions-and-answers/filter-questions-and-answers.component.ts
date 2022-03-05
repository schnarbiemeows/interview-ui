import {Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ForeignKeyOptionsDTO} from "../../../models/ForeignKeyOptionsDTO";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";

@Component({
  selector: 'app-filter-questions-and-answers',
  templateUrl: './filter-questions-and-answers.component.html',
  styleUrls: ['./filter-questions-and-answers.component.css']
})
export class FilterQuestionsAndAnswersComponent implements OnInit, OnChanges {

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

  constructor() {
    console.log("filter constructor, category value = " + this.filterCategoryValue);
  }

  ngOnInit(): void {
    console.log("filter ngOnInit, category value = " + this.filterCategoryValue);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  public filter() {
    let filterParams: FilterParamsDTO = {
      filterCategoryValue: this.filterCategoryValue,
      filterDifficultyValue: this.filterDifficultyValue
    }
    this.filterParams.emit(filterParams);
  }

  public resetFullList() {
    this.filterCategoryValue = null;
    this.filterDifficultyValue = null;
    this.reset.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const catValue = changes['filterCategoryValue'];
    if(catValue != undefined) {
      console.log("change happened, first change = " + catValue.isFirstChange() + " , currentValue = " + catValue.currentValue + " , previousValue = " + catValue.previousValue);
    }
  }
}
