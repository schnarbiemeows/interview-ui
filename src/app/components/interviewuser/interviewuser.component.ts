import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { InterviewUserService } from '../../services/interviewuser/interviewuser.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';
import {forEach} from "@angular-devkit/schematics";
import {InterviewUserDTOWrapper} from "../../models/InterviewUserDTOWrapper";

@Component({
  selector: 'app-interviewuser',
  templateUrl: './interviewuser.component.html'
})
export class InterviewUserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
	interviewuser: InterviewUserDTOWrapper = new InterviewUserDTOWrapper();
	interviewuserlist: InterviewUserDTO[];
	fullinterviewuserlist: InterviewUserDTO[];
    p: number = 1;
    itemsPerPage: number = 10;
    showExtended: boolean = true;
    loaded: boolean = false;
    alwaysHidden: boolean = true;
    enableAdd: boolean = false;
    showInterviewUserForm: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    addbarmsg: string = 'Add User';
    saveChangesMsg: string = 'Save Changes';
    cancelMsg: string = 'Cancel';
    formmsg: string = 'Add InterviewUser';
    paginationDisabled: boolean = false;

	constructor( private interviewuserservice: InterviewUserService ) { }

  ngOnInit() {
    this.reload();
  }

  public searchInterviewUser(searchTerm: string): void {
		const results: InterviewUserDTO[] = [];
		for (const interviewuser of this.fullinterviewuserlist) {
			if(!this.isNullOrUndefined(interviewuser.userId) && interviewuser.userId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.authorizations) && interviewuser.authorizations.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.emailAddr) && interviewuser.emailAddr.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.firstName) && interviewuser.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.userActive) && interviewuser.userActive.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.userNotLocked) && interviewuser.userNotLocked.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.joinDate) && interviewuser.joinDate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastLoginDate) && interviewuser.lastLoginDate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastLoginDateDisplay) && interviewuser.lastLoginDateDisplay.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastName) && interviewuser.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.password) && interviewuser.password.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.profileImage) && interviewuser.profileImage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.roles) && interviewuser.roles.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.userIdentifier) && interviewuser.userIdentifier.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.userName) && interviewuser.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(interviewuser);
			}
		}
		this.interviewuserlist = results;
		if (results.length === 0 || !searchTerm) {
			this.interviewuserlist = this.fullinterviewuserlist;
		}
  }

  initiateAdd() {
    ////console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showInterviewUserForm = true;
    this.paginationDisabled = true;
	  this.interviewuser = new InterviewUserDTOWrapper();
  }

  saveResults() {
	if(this.addMode) {
	  this.interviewuser.userName = this.interviewuser.newUserName;
		this.subscriptions.push(
			this.interviewuserservice.createInterviewUser(this.interviewuser).subscribe(interviewuser => {
			this.interviewuser = new InterviewUserDTOWrapper();
		this.reload();

		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.interviewuserservice.updateInterviewUser(this.interviewuser).subscribe(interviewuser => {
			this.interviewuser = new InterviewUserDTOWrapper();
			this.reload();
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
			this.interviewuserservice.getAllInterviewUser().subscribe(interviewuserlist => {
        this.interviewuserlist = interviewuserlist;
        this.fullinterviewuserlist = interviewuserlist;
        this.loaded = true;
        this.showInterviewUserForm = false;
        this.editMode = false;
        this.addMode = false;
        this.paginationDisabled = false;
      })
    );
  }

  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit InterviewUser';
	  this.interviewuser.fromDto(this.interviewuserlist[i]);
	  //console.log("user id = " + this.interviewuser.userId);
	  this.showInterviewUserForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.interviewuserservice.deleteInterviewUser(this.interviewuserlist[i].userName).subscribe(response => {
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

  showAllUsers() {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
        results.push(interviewuser);
      }
    this.interviewuserlist = results;
  }

  showOnlyUsers(): void {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
      if(interviewuser.roles == "ROLE_BASIC_USER" || interviewuser.roles == "ROLE_ADV_USER" || interviewuser.roles == "ROLE_PREMIUM_USER") {
        results.push(interviewuser);
      }
    }
    this.interviewuserlist = results;
  }

  showOnlyAdmins() {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
      if(interviewuser.roles == "ROLE_ADMIN" || interviewuser.roles == "ROLE_SUPER") {
        results.push(interviewuser);
      }
    }
    this.interviewuserlist = results;
  }

  showBasicUsers() {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
      if(interviewuser.roles == "ROLE_BASIC_USER") {
        results.push(interviewuser);
      }
    }
    this.interviewuserlist = results;
  }

  showAdvUsers() {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
      if(interviewuser.roles == "ROLE_ADV_USER") {
        results.push(interviewuser);
      }
    }
    this.interviewuserlist = results;
  }

  showPremiumUsers() {
    const results: InterviewUserDTO[] = [];
    for (const interviewuser of this.fullinterviewuserlist) {
      if(interviewuser.roles == "ROLE_PREMIUM_USER") {
        results.push(interviewuser);
      }
    }
    this.interviewuserlist = results;
  }
}
