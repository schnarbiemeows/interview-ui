import {Component, Input, OnInit} from '@angular/core';
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionTotalsDto} from "../models/question-totals-dto";

@Component({
  selector: 'app-question-totals-list-item',
  templateUrl: './question-totals-list-item.component.html',
  styleUrls: ['./question-totals-list-item.component.css']
})
export class QuestionTotalsListItemComponent implements OnInit {

  @Input() item: QuestionTotalsDto;
  constructor() { }

  ngOnInit(): void {
  }

}
