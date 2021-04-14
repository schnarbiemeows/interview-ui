import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionCategoryService } from '../../services/questioncategory.service';
import { QuestionCategoryDTO } from '../../models/QuestionCategoryDTO';

@Component({
  selector: 'app-questioncategory',
  templateUrl: './questioncategory.component.html',
  styleUrls: ['./questioncategory.component.css']
})
export class QuestionCategoryComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
	questioncategory: QuestionCategoryDTO = {
		questionCategoryId: null,
		questionCategoryDesc: '',
		evntTmestmp: null,
		evntOperId: ''
	};
	questioncategorylist: QuestionCategoryDTO[];
	fullquestioncategorylist: QuestionCategoryDTO[];
    p: number = 1;
    itemsPerPage: number = 10;
    showExtended: boolean = true;
    loaded: boolean = false;
    alwaysHidden: boolean = true;
    enableAdd: boolean = false;
    showQuestionCategoryForm: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    addbarmsg: string = 'Add Field';
    saveChangesMsg: string = 'Save Changes';
    cancelMsg: string = 'Cancel';
    formmsg: string = 'Add QuestionCategory';
    paginationDisabled: boolean = false;

	constructor( private questioncategoryservice: QuestionCategoryService ) { }

  ngOnInit() {
    this.reload();
  }

  public searchQuestionCategory(searchTerm: string): void {
		const results: QuestionCategoryDTO[] = [];
		for (const questioncategory of this.fullquestioncategorylist) {
			if(!this.isNullOrUndefined(questioncategory.questionCategoryId) && questioncategory.questionCategoryId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questioncategory.questionCategoryDesc) && questioncategory.questionCategoryDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questioncategory.evntTmestmp) && questioncategory.evntTmestmp.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(questioncategory.evntOperId) && questioncategory.evntOperId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(questioncategory);
			}
		}
		this.questioncategorylist = results;
		if (results.length === 0 || !searchTerm) {
			this.questioncategorylist = this.fullquestioncategorylist;
		}
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showQuestionCategoryForm = true;
    this.paginationDisabled = true;
	this.questioncategory = {
		questionCategoryId: null,
		questionCategoryDesc: '',
		evntTmestmp: null,
		evntOperId: ''
	};
  }

  saveResults() {
	if(this.addMode) {
		this.subscriptions.push(
			this.questioncategoryservice.createQuestionCategory(this.questioncategory).subscribe(questioncategory => {
			this.questioncategory = questioncategory;
		this.reload();
		this.questioncategory.questionCategoryId = null;
		this.questioncategory.questionCategoryDesc = '';
		this.questioncategory.evntTmestmp = null;
		this.questioncategory.evntOperId = '';
		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.questioncategoryservice.updateQuestionCategory(this.questioncategory).subscribe(questioncategory => {
			this.questioncategory = questioncategory;
			this.reload();
		this.questioncategory.questionCategoryId = null;
		this.questioncategory.questionCategoryDesc = '';
		this.questioncategory.evntTmestmp = null;
		this.questioncategory.evntOperId = '';
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
			this.questioncategoryservice.getAllQuestionCategory().subscribe(questioncategorylist => {
			this.questioncategorylist = questioncategorylist;
			this.fullquestioncategorylist = questioncategorylist;
			this.loaded = true;
			this.showQuestionCategoryForm = false;
			this.editMode = false;
			this.addMode = false;
			this.paginationDisabled = false;
		})
	);
  }

  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit QuestionCategory';
	this.questioncategory = this.questioncategorylist[i];
	this.showQuestionCategoryForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.questioncategoryservice.deleteQuestionCategory(this.questioncategorylist[i].questionCategoryId).subscribe(response => {
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