import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchTerm = new EventEmitter<string>();
  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void {

  }

  searchQuestionCategory(param: string) {
    console.log("searching by : " + param);
    this.searchTerm.emit(param);
  }
}
