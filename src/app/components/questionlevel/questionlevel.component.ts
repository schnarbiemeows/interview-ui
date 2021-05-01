import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { QuestionLevelService } from '../../services/questionlevel/questionlevel.service';
import { QuestionLevelDTO } from '../../models/QuestionLevelDTO';
import {Role} from "../../enum/role.enum";
import {NotificationType} from "../../enum/notification-type.enum";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-questionlevel',
  templateUrl: './questionlevel.component.html',
  styleUrls: ['./questionlevel.component.css']
})
export class QuestionLevelComponent implements OnInit, OnDestroy {
  userPrivileges:boolean = false;
  advUserPrivileges:boolean = false;
  premiumUserPrivileges:boolean = false;
  adminPrivileges:boolean = false;
  superPrivileges:boolean = false;
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

	constructor( private questionlevelservice: QuestionLevelService,
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
    ////console.log("initiating item add ....")
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
    //console.log(123);
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
