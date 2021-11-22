import {InterviewUserDTO} from "../app/models/InterviewUserDTO";
import {InterviewUserDTOWrapper} from "../app/models/InterviewUserDTOWrapper";
import {BehaviorSubject, Subscription} from "rxjs";

export class InterviewUserServiceStub {

  private subscriptions: Subscription[] = [];
  private loaded = new BehaviorSubject<boolean>(false);
  private addMode = new BehaviorSubject<boolean>(false);
  private editMode = new BehaviorSubject<boolean>(false);
  private showForm = new BehaviorSubject<boolean>(false);
  private paginationDisabled = new BehaviorSubject<boolean>(false);
  private fullinterviewuserlist: InterviewUserDTO[];
  private interviewuserlist = new BehaviorSubject<InterviewUserDTO[]>(null);
  public loaded$ = this.loaded.asObservable();
  public addMode$ = this.addMode.asObservable();
  public editMode$ = this.editMode.asObservable();
  public showForm$ = this.showForm.asObservable();
  public paginationDisabled$ = this.paginationDisabled.asObservable();
  public interviewuserlist$ = this.interviewuserlist.asObservable();

  public searchInterviewUser(searchTerm: string): void {
    console.log("inside the InterviewUserServiceStub.searchInterviewUser method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter( rec =>
      !this.isNullOrUndefined(rec.userId) && rec.userId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.authorizations) && rec.authorizations.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.emailAddr) && rec.emailAddr.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.firstName) && rec.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.userActive) && rec.userActive.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.userNotLocked) && rec.userNotLocked.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.joinDate) && rec.joinDate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.lastLoginDate) && rec.lastLoginDate.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.lastLoginDateDisplay) && rec.lastLoginDateDisplay.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.lastName) && rec.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.password) && rec.password.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.profileImage) && rec.profileImage.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.roles) && rec.roles.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.userIdentifier) && rec.userIdentifier.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      !this.isNullOrUndefined(rec.userName) && rec.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    this.interviewuserlist.next(results);
    if (results.length === 0 || !searchTerm) {
      this.interviewuserlist.next(this.fullinterviewuserlist);
    }*/
  }

  reload() {
    console.log("inside the InterviewUserServiceStub.reload method");
    /*this.loaded.next(false);
    this.subscriptions.push(
      this.api.getAllInterviewUser().subscribe(interviewuserlist => {
        this.interviewuserlist.next(interviewuserlist);
        this.fullinterviewuserlist = interviewuserlist;
        this.loaded.next(true);
        this.showForm.next(false);
        this.editMode.next(false);
        this.addMode.next(false);
        this.paginationDisabled.next(false);
      })
    );*/
  }

  initiateAdd(): InterviewUserDTOWrapper {
    console.log("inside the InterviewUserServiceStub.initiateAdd method");
    ////console.log("initiating item add ....")
    /*this.editMode.next(false);
    this.addMode.next(true);
    this.showForm.next(true);
    this.paginationDisabled.next(true);
    const interviewuser = new InterviewUserDTOWrapper();
    return interviewuser;*/
    return new InterviewUserDTOWrapper();
  }

  saveResults(interviewuser: InterviewUserDTOWrapper) {
    console.log("inside the InterviewUserServiceStub.saveResults method");
    /*if(this.addMode.getValue()) {
      interviewuser.userName = interviewuser.newUserName;
      this.subscriptions.push(
        this.api.createInterviewUser(interviewuser).subscribe(interviewuser => {
          //this.interviewuser = new InterviewUserDTOWrapper();
          this.reload();
          this.paginationDisabled.next(false);
        })
      );
    } else if(this.editMode.getValue()) {
      this.subscriptions.push(
        this.api.updateInterviewUser(interviewuser).subscribe(interviewuser => {
          //this.interviewuser = new InterviewUserDTOWrapper();
          this.reload();
          this.paginationDisabled.next(false);
        })
      );
    }*/
  }

  editItem(i: number): InterviewUserDTOWrapper {
    console.log("inside the InterviewUserServiceStub.editItem method");
    /*this.editMode.next(true);
    this.paginationDisabled.next(true);
    let interviewuser = new InterviewUserDTOWrapper();
    interviewuser.fromDto(this.interviewuserlist.getValue()[i]);
    //console.log("user id = " + this.interviewuser.userId);
    this.showForm.next(true);
    return interviewuser;*/
    return new InterviewUserDTOWrapper();
  }

  deleteItem(i: number) {
    console.log("inside the InterviewUserServiceStub.deleteItem method");
    /*this.subscriptions.push(
      this.api.deleteInterviewUser(this.interviewuserlist.getValue()[i].userName).subscribe(response => {
        this.reload();
        this.paginationDisabled.next(false);
      })
    );*/
  }

  showAllUsers() {
    console.log("inside the InterviewUserServiceStub.showAllUsers method");
    /*const results: InterviewUserDTO[] = [];
    this.interviewuserlist.next(this.fullinterviewuserlist);*/
  }

  showOnlyUsers(): void {
    console.log("inside the InterviewUserServiceStub.showOnlyUsers method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter(rec => rec.roles == "ROLE_BASIC_USER"
      || rec.roles == "ROLE_ADV_USER" || rec.roles == "ROLE_PREMIUM_USER");
    this.interviewuserlist.next(results);*/
  }

  showOnlyAdmins() {
    console.log("inside the InterviewUserServiceStub.showOnlyAdmins method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter(rec => rec.roles == "ROLE_ADMIN"
      || rec.roles == "ROLE_SUPER");
    this.interviewuserlist.next(results);*/
  }

  showBasicUsers() {
    console.log("inside the InterviewUserServiceStub.showBasicUsers method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter(rec => rec.roles == "ROLE_BASIC_USER");
    this.interviewuserlist.next(results);*/
  }

  showAdvUsers() {
    console.log("inside the InterviewUserServiceStub.showAdvUsers method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter(rec => rec.roles == "ROLE_ADV_USER");
    this.interviewuserlist.next(results);*/
  }

  showPremiumUsers() {
    console.log("inside the InterviewUserServiceStub.showPremiumUsers method");
    /*const results: InterviewUserDTO[] = this.fullinterviewuserlist.filter(rec => rec.roles == "ROLE_PREMIUM_USER");
    this.interviewuserlist.next(results);*/
  }

  public destroy() {
    console.log("inside the InterviewUserServiceStub.destroy method");
    //this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
