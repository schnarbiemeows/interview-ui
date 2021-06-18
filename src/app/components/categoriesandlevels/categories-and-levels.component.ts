import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponseMessage} from '../../models/ResponseMessage';
import {QuestionCategoryService} from '../../services/questioncategory/questioncategory.service';
import {QuestionCategoryDTO} from '../../models/QuestionCategoryDTO';
import {Role} from "../../enum/role.enum";
import {NotificationType} from "../../enum/notification-type.enum";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notification/notification.service";
import {QuestionLevelDTO} from "../../models/QuestionLevelDTO";
import {QuestionLevelService} from "../../services/questionlevel/questionlevel.service";
import {InterviewUserDTO} from "../../models/InterviewUserDTO";

@Component({
  selector: 'app-categories-and-levels',
  templateUrl: './categories-and-levels.component.html'
})
export class CategoriesAndLevelsComponent implements OnInit, OnDestroy {
  interviewuser: InterviewUserDTO;
  userPrivileges: boolean = false;
  advUserPrivileges: boolean = false;
  premiumUserPrivileges: boolean = false;
  adminPrivileges: boolean = false;
  superPrivileges: boolean = false;
  private subscriptions: Subscription[] = [];
  questioncategory: QuestionCategoryDTO = {
    questionCategoryId: null,
    questionCategoryDesc: '',
    evntTmestmp: null,
    evntOperId: '',
    displayCde: ''
  };
  questioncategorylist: QuestionCategoryDTO[];
  fullquestioncategorylist: QuestionCategoryDTO[];
  pc: number = 1;
  itemsPerPage: number = 10;
  loadedCategory: boolean = false;
  alwaysHidden: boolean = true;
  enableAddCategory: boolean = false;
  showQuestionCategoryForm: boolean = false;
  addModeCategory: boolean = false;
  editModeCategory: boolean = false;
  addbarmsgCategory: string = 'Add Question Category';
  saveChangesMsg: string = 'Save Changes';
  cancelMsg: string = 'Cancel';
  formmsgCategory: string = 'Add Question Category';
  paginationDisabledCategory: boolean = false;

  questionlevel: QuestionLevelDTO = {
    questionLevelId: null,
    questionLevelDesc: '',
    evntTmestmp: null,
    evntOperId: ''
  };
  questionlevellist: QuestionLevelDTO[];
  fullquestionlevellist: QuestionLevelDTO[];
  pl: number = 1;
  loadedLevel: boolean = false;
  enableAddLevel: boolean = false;
  showQuestionLevelForm: boolean = false;
  addModeLevel: boolean = false;
  editModeLevel: boolean = false;
  addbarmsgLevel: string = 'Add Difficulty Level';
  formmsgLevel: string = 'Add Difficulty Level';
  paginationDisabledLevel: boolean = false;

  constructor(private questioncategoryservice: QuestionCategoryService,
              private questionlevelservice: QuestionLevelService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.interviewuser = this.authenticationService.getUserFromLocalCache();
    this.userPrivileges = this.isUser;
    this.advUserPrivileges = this.isAdvUser;
    this.premiumUserPrivileges = this.isPremUser;
    this.adminPrivileges = this.isAdmin;
    this.superPrivileges = this.isSuper;
    this.reloadCategory();
    this.reloadLevel();
  }

  public searchQuestionCategory(searchTerm: string): void {
    const results: QuestionCategoryDTO[] = [];
    for (const questioncategory of this.fullquestioncategorylist) {
      if (!this.isNullOrUndefined(questioncategory.questionCategoryId) && questioncategory.questionCategoryId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(questioncategory.questionCategoryDesc) && questioncategory.questionCategoryDesc.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(questioncategory.evntTmestmp) && questioncategory.evntTmestmp.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(questioncategory.evntOperId) && questioncategory.evntOperId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(questioncategory.displayCde) && questioncategory.displayCde.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(questioncategory);
      }
    }
    this.questioncategorylist = results;
    if (results.length === 0 || !searchTerm) {
      this.questioncategorylist = this.fullquestioncategorylist;
    }
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

  initiateAddCategory() {
    this.editModeCategory = false;
    this.addModeCategory = true;
    this.showQuestionCategoryForm = true;
    this.paginationDisabledCategory = true;
    this.questioncategory = {
      questionCategoryId: null,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
  }

  initiateAddLevel() {
    this.editModeLevel = false;
    this.addModeLevel = true;
    this.showQuestionLevelForm = true;
    this.paginationDisabledLevel = true;
    this.questionlevel = {
      questionLevelId: null,
      questionLevelDesc: '',
      evntTmestmp: null,
      evntOperId: ''
    };
  }

  saveResultsCategory() {
    this.questioncategory.evntOperId = this.interviewuser.userName;
    if (this.addModeCategory) {
      this.subscriptions.push(
        this.questioncategoryservice.createQuestionCategory(this.questioncategory).subscribe(questioncategory => {
          this.questioncategory = questioncategory;
          this.reloadCategory();
          this.questioncategory.questionCategoryId = null;
          this.questioncategory.questionCategoryDesc = '';
          this.questioncategory.evntTmestmp = null;
          this.questioncategory.evntOperId = '';
          this.questioncategory.displayCde = '';
          this.paginationDisabledCategory = false;
        })
      );
    } else if (this.editModeCategory) {
      this.subscriptions.push(
        this.questioncategoryservice.updateQuestionCategory(this.questioncategory).subscribe(questioncategory => {
          this.questioncategory = questioncategory;
          this.reloadCategory();
          this.questioncategory.questionCategoryId = null;
          this.questioncategory.questionCategoryDesc = '';
          this.questioncategory.evntTmestmp = null;
          this.questioncategory.evntOperId = '';
          this.questioncategory.displayCde = '';
          this.paginationDisabledCategory = false;
        })
      );
    }
  }

  saveResultsLevel() {
    this.questionlevel.evntOperId = this.interviewuser.userName;
    if(this.addModeLevel) {
      this.subscriptions.push(
        this.questionlevelservice.createQuestionLevel(this.questionlevel).subscribe(questionlevel => {
          this.questionlevel = questionlevel;
          this.reloadLevel();
          this.questionlevel.questionLevelId = null;
          this.questionlevel.questionLevelDesc = '';
          this.questionlevel.evntTmestmp = null;
          this.questionlevel.evntOperId = '';
          this.paginationDisabledLevel = false;
        })
      );
    } else if(this.editModeLevel) {
      this.subscriptions.push(
        this.questionlevelservice.updateQuestionLevel(this.questionlevel).subscribe(questionlevel => {
          this.questionlevel = questionlevel;
          this.reloadLevel();
          this.questionlevel.questionLevelId = null;
          this.questionlevel.questionLevelDesc = '';
          this.questionlevel.evntTmestmp = null;
          this.questionlevel.evntOperId = '';
          this.paginationDisabledLevel = false;
        })
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  reloadCategory() {
    this.loadedCategory = false;
    this.subscriptions.push(
      this.questioncategoryservice.getAllQuestionCategory().subscribe(questioncategorylist => {
        this.questioncategorylist = questioncategorylist;
        this.fullquestioncategorylist = questioncategorylist;
        this.loadedCategory = true;
        this.showQuestionCategoryForm = false;
        this.editModeCategory = false;
        this.addModeCategory = false;
        this.paginationDisabledCategory = false;
      })
    );
  }

  reloadLevel() {
    this.loadedLevel = false;
    this.subscriptions.push(
      this.questionlevelservice.getAllQuestionLevel().subscribe(questionlevellist => {
        this.questionlevellist = questionlevellist;
        this.fullquestionlevellist = questionlevellist;
        this.loadedLevel = true;
        this.showQuestionLevelForm = false;
        this.editModeLevel = false;
        this.addModeLevel = false;
        this.paginationDisabledLevel = false;
      })
    );
  }

  editCategoryItem(i: number) {
    this.editModeCategory = true;
    this.paginationDisabledCategory = true;
    this.formmsgCategory = 'Edit Question Category';
    this.questioncategory = this.questioncategorylist[i];
    this.showQuestionCategoryForm = true;
  }

  editLevelItem(i: number) {
    this.editModeLevel = true;
    this.paginationDisabledLevel = true;
    this.formmsgLevel = 'Edit Question Level';
    this.questionlevel = this.questionlevellist[i];
    this.showQuestionLevelForm = true;
  }

  deleteCategoryItem(i: number) {
    this.subscriptions.push(
      this.questioncategoryservice.deleteQuestionCategory(this.questioncategorylist[i].questionCategoryId).subscribe(response => {
        this.reloadCategory();
        this.paginationDisabledCategory = false;
      })
    );
  }

  deleteLevelItem(i: number) {
    this.subscriptions.push(
      this.questionlevelservice.deleteQuestionLevel(this.questionlevellist[i].questionLevelId).subscribe(response => {
        this.reloadLevel();
        this.paginationDisabledLevel = false;
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
    if (input === 'undefined') return true;
    if (input == null) return true;
    return false;
  }
}
