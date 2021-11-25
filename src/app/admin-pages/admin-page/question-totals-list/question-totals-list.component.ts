import {Component, Input, OnInit} from '@angular/core';
import {QuestionTotalsDto} from "../models/question-totals-dto";

@Component({
  selector: 'app-question-totals-list',
  templateUrl: './question-totals-list.component.html',
  styleUrls: ['./question-totals-list.component.css']
})
export class QuestionTotalsListComponent implements OnInit {

  @Input() questionTotalsList: QuestionTotalsDto[];
  constructor() { }

  ngOnInit(): void {
  }

}
