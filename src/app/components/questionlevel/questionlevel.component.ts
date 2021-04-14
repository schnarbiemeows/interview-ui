import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionLevelService } from '../../services/questionlevel.service';
import { QuestionLevelDTO } from '../../models/QuestionLevelDTO';

@Component({
  selector: 'app-questionlevel',
  templateUrl: './questionlevel.component.html',
  styleUrls: ['./questionlevel.component.css']
})
export class QuestionLevelComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
	questionlevel: QuestionLevelDTO = {
		questionLevelId: null,
		questionLevelDesc: '',
		evntTmestmp: null,
		evntOperId: ''
	};
	questionlevellist: QuestionLevelDTO[];
	fullquestionlevellist: QuestionLevelDTO[];
    p: number = 1;
    itemsPerPage: number = 10;
    showExtended: boolean = true;
    loaded: boolean = false;
    alwaysHidden: boolean = true;
    enableAdd: boolean = false;
    showQuestionLevelForm: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    addbarmsg: string = 'Add Field';
    saveChangesMsg: string = 'Save Changes';
    cancelMsg: string = 'Cancel';
    formmsg: string = 'Add QuestionLevel';
    paginationDisabled: boolean = false;

	constructor( private questionlevelservice: QuestionLevelService ) { }

  ngOnInit() {
    this.reload();
  }

  public searchQuestionLevel(searchTerm: string): void {
		const results: QuestionLevelDTO[] = [];
		for (const questionlevel of this.fullquestionlevellist) {
			if(!this.isNullOrUndefined(questionlevel.questionLevelId) && questionlevel.questionLevelId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questionlevel.questionLevelDesc) && questionlevel.questionLevelDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questionlevel.evntTmestmp) && questionlevel.evntTmestmp.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questionlevel.evntOperId) && questionlevel.evntOperId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(questionlevel);
			}
		}
		this.questionlevellist = results;
		if (results.length === 0 || !searchTerm) {
			this.questionlevellist = this.fullquestionlevellist;
		}
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showQuestionLevelForm = true;
    this.paginationDisabled = true;
	this.questionlevel = {
		questionLevelId: null,
		questionLevelDesc: '',
		evntTmestmp: null,
		evntOperId: ''
	};
  }

  saveResults() {
	if(this.addMode) {
		this.subscriptions.push(
			this.questionlevelservice.createQuestionLevel(this.questionlevel).subscribe(questionlevel => {
			this.questionlevel = questionlevel;
		this.reload();
		this.questionlevel.questionLevelId = null;
		this.questionlevel.questionLevelDesc = '';
		this.questionlevel.evntTmestmp = null;
		this.questionlevel.evntOperId = '';
		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.questionlevelservice.updateQuestionLevel(this.questionlevel).subscribe(questionlevel => {
			this.questionlevel = questionlevel;
			this.reload();
		this.questionlevel.questionLevelId = null;
		this.questionlevel.questionLevelDesc = '';
		this.questionlevel.evntTmestmp = null;
		this.questionlevel.evntOperId = '';
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
			this.questionlevelservice.getAllQuestionLevel().subscribe(questionlevellist => {
			this.questionlevellist = questionlevellist;
			this.fullquestionlevellist = questionlevellist;
			this.loaded = true;
			this.showQuestionLevelForm = false;
			this.editMode = false;
			this.addMode = false;
			this.paginationDisabled = false;
		})
	);
  }

  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit QuestionLevel';
	this.questionlevel = this.questionlevellist[i];
	this.showQuestionLevelForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.questionlevelservice.deleteQuestionLevel(this.questionlevellist[i].questionLevelId).subscribe(response => {
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