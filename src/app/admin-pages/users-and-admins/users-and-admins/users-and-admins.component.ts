import {Component, OnDestroy, OnInit} from '@angular/core';
import {InterviewUserService} from "../../../services/interviewuser/interview-user.service";
import {Subscription} from "rxjs";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {InterviewUserDTOWrapper} from "../../../models/InterviewUserDTOWrapper";
import {Role} from "../../../enum/role.enum";

@Component({
  selector: 'app-users-and-admins2',
  templateUrl: './users-and-admins.component.html',
  styleUrls: ['./users-and-admins.component.css']
})
export class UsersAndAdminsComponent implements OnInit, OnDestroy {

  currentUser: InterviewUserDTO;
  // modes and page states
  public loaded: boolean;
  public addMode:boolean;
  public editMode:boolean;
  public showForm: boolean;
  public paginationDisabled: boolean;

  public userlist: InterviewUserDTO[];
  /**
   * this represents a record in the list, as well as the backing bean for the add/edit form
   */
  public userItem: InterviewUserDTOWrapper;
  /**
   *  6 total Subscriptions
   */
  private loadedSub: Subscription = null;
  private addModeSub: Subscription = null;
  private editModeSub: Subscription = null;
  private showFormSub: Subscription = null;
  private paginationDisabledSub: Subscription = null;
  private userListSub: Subscription = null;

  public sqlSrchMsg: string = "Search Users & Admins";

  constructor(private interviewuserservice: InterviewUserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserFromLocalCache();
    this.interviewuserservice.reload();
    /**
     *  6 total Subscriptions
     */
    this.addModeSub = this.interviewuserservice.addMode$.subscribe((data) => {
      this.addMode = data;
    });
    this.editModeSub = this.interviewuserservice.editMode$.subscribe((data) => {
      this.editMode = data;
    });
    this.loadedSub = this.interviewuserservice.loaded$.subscribe((data) => {
      this.loaded = data;
    });
    this.paginationDisabledSub = this.interviewuserservice.paginationDisabled$.subscribe((data) => {
      this.paginationDisabled = data;
    });
    this.showFormSub = this.interviewuserservice.showForm$.subscribe((data) => {
      this.showForm = data;
    });
    // subscribe to the data lists
    this.userListSub = this.interviewuserservice.interviewuserlist$.subscribe((data) => {
      this.userlist = data;
    });
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

  public initiateAdd() {
    this.userItem = this.interviewuserservice.initiateAdd();
  }

  public editItem(i: number) {
    this.userItem = this.interviewuserservice.editItem(i);
  }

  public deleteItem(i: number) {
    this.interviewuserservice.deleteItem(i);
  }

  public search(params: string) {
    this.interviewuserservice.searchInterviewUser(params);
  }

  ngOnDestroy(): void {
    console.log("destroying");
    this.interviewuserservice.destroy();
    /**
     * 6 total Subscriptions
     */
    this.loadedSub.unsubscribe();
    this.addModeSub.unsubscribe();
    this.editModeSub.unsubscribe();
    this.showFormSub.unsubscribe();
    this.paginationDisabledSub.unsubscribe();
    this.userListSub.unsubscribe();
  }

  receiveFormCancel() {
    this.interviewuserservice.reload();
  }

  receiveFormSaveAdd(newItem: InterviewUserDTOWrapper) {
    console.log("receiving add question-answer form save");
    this.interviewuserservice.saveResults(newItem);
  }

  receiveFormSaveEdit(editItem: InterviewUserDTOWrapper) {
    console.log("receiving edit question-answer form save ");
    this.interviewuserservice.saveResults(editItem);
  }

  receiveFilterRequest(num: number) {
    if(num==0) {
      this.interviewuserservice.showAllUsers();
    } else if(num==1) {
      this.interviewuserservice.showOnlyUsers();
    } else if(num==2) {
      this.interviewuserservice.showOnlyAdmins();
    } else if(num==3) {
      this.interviewuserservice.showBasicUsers();
    } else if(num==4) {
      this.interviewuserservice.showAdvUsers();
    } else if(num==5) {
      this.interviewuserservice.showPremiumUsers();
    }
  }
}
