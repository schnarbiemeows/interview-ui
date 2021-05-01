import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { AnswerService } from '../../services/answer/answer.service';
import { AnswerDTO } from '../../models/AnswerDTO';
import {Role} from "../../enum/role.enum";
import {NotificationType} from "../../enum/notification-type.enum";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnDestroy {
  userPrivileges:boolean = false;
  advUserPrivileges:boolean = false;
  premiumUserPrivileges:boolean = false;
  adminPrivileges:boolean = false;
  superPrivileges:boolean = false;
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

	constructor( private answerservice: AnswerService,
               private authenticationService: AuthenticationService,
               private notificationService: NotificationService) { }

  ngOnInit() {
    this.userPrivileges = this.isUser;
    this.advUserPrivileges = this.isAdvUser;
    this.premiumUserPrivileges = this.isPremUser;
    this.adminPrivileges = this.isAdmin;
    this.superPrivileges = this.isSuper;
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
    ////console.log("initiating item add ....")
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
    //console.log(123);
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

  public get isUser(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isAdvUser(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isPremUser(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isSuper(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN;
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().roles;
  }

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
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
