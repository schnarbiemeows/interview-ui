import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { ResponseMessage } from '../../models/ResponseMessage';
import { InterviewUserService } from '../../services/interviewuser.service';
import { InterviewUserDTO } from '../../models/InterviewUserDTO';

@Component({
  selector: 'app-interviewuser',
  templateUrl: './interviewuser.component.html',
  styleUrls: ['./interviewuser.component.css']
})
export class InterviewUserComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
	interviewuser: InterviewUserDTO = {
		userId: null,
		authorizations: [],
		emailaddr: '',
		firstname: '',
		isuseractive: null,
		isusernotlocked: null,
		joindate: null,
		lastlogindate: null,
		lastlogindatedisplay: null,
		lastname: '',
		password: '',
		profileimage: '',
		roles: '',
		useridentifier: '',
		username: ''
	};
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
    addbarmsg: string = 'Add Field';
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
				!this.isNullOrUndefined(interviewuser.emailaddr) && interviewuser.emailaddr.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.firstname) && interviewuser.firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.isuseractive) && interviewuser.isuseractive.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.isusernotlocked) && interviewuser.isusernotlocked.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.joindate) && interviewuser.joindate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastlogindate) && interviewuser.lastlogindate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastlogindatedisplay) && interviewuser.lastlogindatedisplay.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.lastname) && interviewuser.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.password) && interviewuser.password.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.profileimage) && interviewuser.profileimage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.roles) && interviewuser.roles.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.useridentifier) && interviewuser.useridentifier.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
				!this.isNullOrUndefined(interviewuser.username) && interviewuser.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
				results.push(interviewuser);
			}
		}
		this.interviewuserlist = results;
		if (results.length === 0 || !searchTerm) {
			this.interviewuserlist = this.fullinterviewuserlist;
		}
  }

  initiateAdd() {
    //console.log("initiating item add ....")
    this.editMode = false;
    this.addMode = true;
    this.showInterviewUserForm = true;
    this.paginationDisabled = true;
	this.interviewuser = {
		userId: null,
		authorizations: [],
		emailaddr: '',
		firstname: '',
		isuseractive: null,
		isusernotlocked: null,
		joindate: null,
		lastlogindate: null,
		lastlogindatedisplay: null,
		lastname: '',
		password: '',
		profileimage: '',
		roles: '',
		useridentifier: '',
		username: ''
	};
  }

  saveResults() {
		let authorizationstemp = this.interviewuser.authorizations.toString();
		this.interviewuser.authorizations = authorizationstemp.split(",");
	if(this.addMode) {
		this.subscriptions.push(
			this.interviewuserservice.createInterviewUser(this.interviewuser).subscribe(interviewuser => {
			this.interviewuser = interviewuser;
		this.reload();
		this.interviewuser.userId = null;
		this.interviewuser.authorizations = [];
		this.interviewuser.emailaddr = '';
		this.interviewuser.firstname = '';
		this.interviewuser.isuseractive = null;
		this.interviewuser.isusernotlocked = null;
		this.interviewuser.joindate = null;
		this.interviewuser.lastlogindate = null;
		this.interviewuser.lastlogindatedisplay = null;
		this.interviewuser.lastname = '';
		this.interviewuser.password = '';
		this.interviewuser.profileimage = '';
		this.interviewuser.roles = '';
		this.interviewuser.useridentifier = '';
		this.interviewuser.username = '';
		this.paginationDisabled = false;
		})
	);
	} else if(this.editMode) {
		this.subscriptions.push(
			this.interviewuserservice.updateInterviewUser(this.interviewuser).subscribe(interviewuser => {
			this.interviewuser = interviewuser;
			this.reload();
		this.interviewuser.userId = null;
		this.interviewuser.authorizations = [];
		this.interviewuser.emailaddr = '';
		this.interviewuser.firstname = '';
		this.interviewuser.isuseractive = null;
		this.interviewuser.isusernotlocked = null;
		this.interviewuser.joindate = null;
		this.interviewuser.lastlogindate = null;
		this.interviewuser.lastlogindatedisplay = null;
		this.interviewuser.lastname = '';
		this.interviewuser.password = '';
		this.interviewuser.profileimage = '';
		this.interviewuser.roles = '';
		this.interviewuser.useridentifier = '';
		this.interviewuser.username = '';
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
	this.interviewuser = this.interviewuserlist[i];
	this.showInterviewUserForm = true;
  }

  deleteItem(i: number) {
		this.subscriptions.push(
			this.interviewuserservice.deleteInterviewUser(this.interviewuserlist[i].userId).subscribe(response => {
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