import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { AnswerService } from '../../services/answer.service';
import { AnswerDTO } from '../../models/AnswerDTO';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
	answer: AnswerDTO = {
		answerId: null,
		answerTxt: '',
		evntTmestmp: null,
		evntOperId: ''
	};
	answerlist: AnswerDTO[];
	fullanswerlist: AnswerDTO[];
    p: number = 1;
    itemsPerPage: number = 10;
    showExtended: boolean = true;
    loaded: boolean = false;
    alwaysHidden: boolean = true;
    enableAdd: boolean = false;
    showAnswerForm: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    addbarmsg: string = 'Add Field';
    saveChangesMsg: string = 'Save Changes';
    cancelMsg: string = 'Cancel';
    formmsg: string = 'Add Answer';
    paginationDisabled: boolean = false;

	constructor( private answerservice: AnswerService ) { }

  ngOnInit() {
    this.reload();
  }

  public searchAnswer(searchTerm: string): void {
		const results: AnswerDTO[] = [];
		for (const answer of this.fullanswerlist) {
			if(!this.isNullOrUndefined(answer.answerId) && answer.answerId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(answer.answerTxt) && answer.answerTxt.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(answer.evntTmestmp) && answer.evntTmestmp.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(answer.evntOperId) && answer.evntOperId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(answer);
			}
		}
		this.answerlist = results;
		if (results.length === 0 || !searchTerm) {
			this.answerlist = this.fullanswerlist;
		}
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showAnswerForm = true;
    this.paginationDisabled = true;
	this.answer = {
		answerId: null,
		answerTxt: '',
		evntTmestmp: null,
		evntOperId: ''
	};
  }

  saveResults() {
	if(this.addMode) {
		this.subscriptions.push(
			this.answerservice.createAnswer(this.answer).subscribe(answer => {
			this.answer = answer;
		this.reload();
		this.answer.answerId = null;
		this.answer.answerTxt = '';
		this.answer.evntTmestmp = null;
		this.answer.evntOperId = '';
		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.answerservice.updateAnswer(this.answer).subscribe(answer => {
			this.answer = answer;
			this.reload();
		this.answer.answerId = null;
		this.answer.answerTxt = '';
		this.answer.evntTmestmp = null;
		this.answer.evntOperId = '';
		this.paginationDisabled = false;
		})
	);
	}
  }

  onSubmit(e) {
    console.log(123);
    e.preventDefault();
  }

  reload() {
    this.loaded = false;
		this.subscriptions.push(
			this.answerservice.getAllAnswer().subscribe(answerlist => {
			this.answerlist = answerlist;
			this.fullanswerlist = answerlist;
			this.loaded = true;
			this.showAnswerForm = false;
			this.editMode = false;
			this.addMode = false;
			this.paginationDisabled = false;
		})
	);
  }

  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit Answer';
	this.answer = this.answerlist[i];
	this.showAnswerForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.answerservice.deleteAnswer(this.answerlist[i].answerId).subscribe(response => {
			this.reload();
			this.paginationDisabled = false;
			})
		);
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

	private isNullOrUndefined(input: any): boolean {
		if(input === 'undefined') return true;
		if(input == null) return true;
		return false;
	}
}