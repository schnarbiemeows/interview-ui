import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionService } from '../../services/question.service';
import { QuestionDTO } from '../../models/QuestionDTO';
import { ForeignKeyOptionsDTO } from '../../models/ForeignKeyOptionsDTO';
import { QuestionCategoryService } from '../../services/questioncategory.service';
import { QuestionCategoryDTO } from '../../models/QuestionCategoryDTO';
import { QuestionLevelService } from '../../services/questionlevel.service';
import { QuestionLevelDTO } from '../../models/QuestionLevelDTO';
import { AnswerService } from '../../services/answer.service';
import { AnswerDTO } from '../../models/AnswerDTO';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
	question: QuestionDTO = {
		questionId: null,
		questionCategoryId: null,
		questionLevelId: null,
		answerId: null,
		questionTxt: '',
		evntTmestmp: null,
		evntOperId: ''
	};
	questionlist: QuestionDTO[];
	fullquestionlist: QuestionDTO[];
	questioncategorylist: ForeignKeyOptionsDTO[] = [];
	questioncategorymap = new Map();
	questionlevellist: ForeignKeyOptionsDTO[] = [];
	questionlevelmap = new Map();
	answerlist: ForeignKeyOptionsDTO[] = [];
	answermap = new Map();
    p: number = 1;
    itemsPerPage: number = 10;
    showExtended: boolean = true;
    loaded: boolean = false;
    alwaysHidden: boolean = true;
    enableAdd: boolean = false;
    showQuestionForm: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    addbarmsg: string = 'Add Field';
    saveChangesMsg: string = 'Save Changes';
    cancelMsg: string = 'Cancel';
    formmsg: string = 'Add Question';
    paginationDisabled: boolean = false;

	constructor( private questionservice: QuestionService,private questioncategoryservice: QuestionCategoryService,private questionlevelservice: QuestionLevelService,private answerservice: AnswerService ) { }

  ngOnInit() {
    this.reload();
	this.subscriptions.push(
	this.questioncategoryservice.getAllQuestionCategory().subscribe(questioncategorylist => {
		console.log("length of questioncategorylist = " + questioncategorylist.length);
		for (let entry of questioncategorylist) {
			// change the value of entry.xxxx to be the actual field that you want to display
			let optionDTO = new ForeignKeyOptionsDTO();
			optionDTO.value = entry.questionCategoryId;
			optionDTO.viewValue = entry.evntTmestmp;
			this.questioncategorylist.push(optionDTO);
			this.questioncategorymap.set(entry.questionCategoryId,entry.evntTmestmp);
		}
	})
	);
	this.subscriptions.push(
	this.questionlevelservice.getAllQuestionLevel().subscribe(questionlevellist => {
		console.log("length of questionlevellist = " + questionlevellist.length);
		for (let entry of questionlevellist) {
			// change the value of entry.xxxx to be the actual field that you want to display
			let optionDTO = new ForeignKeyOptionsDTO();
			optionDTO.value = entry.questionLevelId;
			optionDTO.viewValue = entry.evntTmestmp;
			this.questionlevellist.push(optionDTO);
			this.questionlevelmap.set(entry.questionLevelId,entry.evntTmestmp);
		}
	})
	);
	this.subscriptions.push(
	this.answerservice.getAllAnswer().subscribe(answerlist => {
		console.log("length of answerlist = " + answerlist.length);
		for (let entry of answerlist) {
			// change the value of entry.xxxx to be the actual field that you want to display
			let optionDTO = new ForeignKeyOptionsDTO();
			optionDTO.value = entry.answerId;
			optionDTO.viewValue = entry.evntTmestmp;
			this.answerlist.push(optionDTO);
			this.answermap.set(entry.answerId,entry.evntTmestmp);
		}
	})
	);
  }

  public searchQuestion(searchTerm: string): void {
		const results: QuestionDTO[] = [];
		for (const question of this.fullquestionlist) {
			if(!this.isNullOrUndefined(question.questionId) && question.questionId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.questionCategoryId) && question.questionCategoryId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.questionLevelId) && question.questionLevelId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.answerId) && question.answerId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.questionTxt) && question.questionTxt.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.evntTmestmp) && question.evntTmestmp.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(question.evntOperId) && question.evntOperId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(question);
			}
		}
		this.questionlist = results;
		if (results.length === 0 || !searchTerm) {
			this.questionlist = this.fullquestionlist;
		}
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showQuestionForm = true;
    this.paginationDisabled = true;
	this.question = {
		questionId: null,
		questionCategoryId: null,
		questionLevelId: null,
		answerId: null,
		questionTxt: '',
		evntTmestmp: null,
		evntOperId: ''
	};
  }

  saveResults() {
	if(this.addMode) {
		this.subscriptions.push(
			this.questionservice.createQuestion(this.question).subscribe(question => {
			this.question = question;
		this.reload();
		this.question.questionId = null;
		this.question.questionCategoryId = null;
		this.question.questionLevelId = null;
		this.question.answerId = null;
		this.question.questionTxt = '';
		this.question.evntTmestmp = null;
		this.question.evntOperId = '';
		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.questionservice.updateQuestion(this.question).subscribe(question => {
			this.question = question;
			this.reload();
		this.question.questionId = null;
		this.question.questionCategoryId = null;
		this.question.questionLevelId = null;
		this.question.answerId = null;
		this.question.questionTxt = '';
		this.question.evntTmestmp = null;
		this.question.evntOperId = '';
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
			this.questionservice.getAllQuestion().subscribe(questionlist => {
			this.questionlist = questionlist;
			this.fullquestionlist = questionlist;
			this.loaded = true;
			this.showQuestionForm = false;
			this.editMode = false;
			this.addMode = false;
			this.paginationDisabled = false;
		})
	);
  }

  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit Question';
	this.question = this.questionlist[i];
	this.showQuestionForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.questionservice.deleteQuestion(this.questionlist[i].questionId).subscribe(response => {
			this.reload();
			this.paginationDisabled = false;
			})
		);
  }

	findByQuestionCategoryId() {
		this.subscriptions.push(
			this.questionservice.findQuestionByQuestionCategoryId(this.question.questionCategoryId).subscribe(response => {
				console.log("back from findByQuestionCategoryId");
				console.log("array size = " + response.length );
				this.reload();
			})
		);
	}

	findByQuestionLevelId() {
		this.subscriptions.push(
			this.questionservice.findQuestionByQuestionLevelId(this.question.questionLevelId).subscribe(response => {
				console.log("back from findByQuestionLevelId");
				console.log("array size = " + response.length );
				this.reload();
			})
		);
	}

	findByAnswerId() {
		this.subscriptions.push(
			this.questionservice.findQuestionByAnswerId(this.question.answerId).subscribe(response => {
				console.log("back from findByAnswerId");
				console.log("array size = " + response.length );
				this.reload();
			})
		);
	}

	findByQuestionCategoryIdAndQuestionLevelIdAndAnswerId() {
		this.subscriptions.push(
			this.questionservice.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerId(this.question.questionCategoryId,this.question.questionLevelId,this.question.answerId).subscribe(response => {
				console.log("back from findByQuestionCategoryIdAndQuestionLevelIdAndAnswerId");
				console.log("array size = " + response.length );
				this.reload();
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