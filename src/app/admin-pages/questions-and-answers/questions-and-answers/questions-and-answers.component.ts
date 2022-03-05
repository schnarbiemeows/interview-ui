import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ForeignKeyOptionsDTO} from '../../../models/ForeignKeyOptionsDTO';
import {QuestionCategoryService} from "../../../services/questioncategory/question-category.service";
import {QuestionLevelService} from "../../../services/questionlevel/question-level.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {Role} from "../../../enum/role.enum";
import {QuestionAnswerItemDTO} from "../../../models/QuestionAnswerItemDTO";
import {QuestionAndAnswersService} from "../../../services/question-and-answers/question-and-answers.service";
import {FilterParamsDTO} from "../../../models/FilterParamsDTO";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";

@Component({
  selector: 'app-questions-and-answers2',
  templateUrl: './questions-and-answers.component.html',
  styleUrls: ['./questions-and-answers.component.css']
  //providers: [QuestionCategoryService, QuestionLevelService,QuestionAndAnswersService]
})
export class QuestionsAndAnswersComponent implements OnInit, OnDestroy {

  currentUser: InterviewUserDTO;
  // modes and page states
  public loaded: boolean;
  public addMode:boolean;
  public editMode:boolean;
  public showForm: boolean;
  public paginationDisabled: boolean;
  public questionAnswerlist: QuestionAnswerItemDTO[];
  public questioncategorylist:ForeignKeyOptionsDTO[] = [];  // for the filter
  public questionlevellist:ForeignKeyOptionsDTO[] = []; // for the filter
  public questionCategoryFormList:ForeignKeyOptionsDTO[] = []; // for the form
  public questionLevelFormList:ForeignKeyOptionsDTO[] = []; // for the form
  /**
   * this represents a record in the list, as well as the backing bean for the add/edit form
   */
  public questionAnswerItem: QuestionAnswerItemDTO;
  public totalQuestions: number;  // for the filter
  public filterCategoryValue: number; // for the filter
  public filterDifficultyValue: number; // for the filter
  /**
   * 13 total Subscriptions
   */
  private loadedSub: Subscription = null;
  private addModeSub: Subscription = null;
  private editModeSub: Subscription = null;
  private showFormSub: Subscription = null;
  private paginationDisabledSub: Subscription = null;
  private listSub: Subscription = null;
  private categoryListSub: Subscription = null;
  private levelListSub: Subscription = null;
  private categoryFormListSub: Subscription = null;
  private levelFormListSub: Subscription = null;
  private totalQuestionsSub: Subscription = null;
  private filterCategoryValueSub: Subscription = null;
  private filterDifficultyValueSub: Subscription = null;
  public sqlSrchMsg: string = "Search Q & A";

  constructor(private questionanswerservice: QuestionAndAnswersService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    console.log("component constructor");
  }

  ngOnInit(): void {
    console.log("component init");
    this.currentUser = this.authenticationService.getUserFromLocalCache();
    /**
     * 13 total Subscriptions
     */
    this.addModeSub = this.questionanswerservice.addMode$.subscribe((data) => {
      this.addMode = data;
    });
    this.editModeSub = this.questionanswerservice.editMode$.subscribe((data) => {
      this.editMode = data;
    });
    this.loadedSub = this.questionanswerservice.loaded$.subscribe((data) => {
      this.loaded = data;
    });
    this.paginationDisabledSub = this.questionanswerservice.paginationDisabled$.subscribe((data) => {
      this.paginationDisabled = data;
    });
    this.showFormSub = this.questionanswerservice.showForm$.subscribe((data) => {
      this.showForm = data;
    });
    // subscribe to the data lists
    this.listSub = this.questionanswerservice.questionItemlist$.subscribe((data) => {
      this.questionAnswerlist = data;
    });
    this.categoryListSub = this.questionanswerservice.questioncategorylist$.subscribe((data) => {
      this.questioncategorylist = data;
    });
    this.levelListSub = this.questionanswerservice.questionlevellist$.subscribe((data) => {
      this.questionlevellist = data;
    });
    this.categoryFormListSub = this.questionanswerservice.questionCategoryFormList$.subscribe((data) => {
      this.questionCategoryFormList = data;
    });
    this.levelFormListSub = this.questionanswerservice.questionLevelFormList$.subscribe((data) => {
      this.questionLevelFormList = data;
    });
    this.totalQuestionsSub = this.questionanswerservice.totalQuestions$.subscribe((data) => {
      this.totalQuestions = data;
    });
    this.filterCategoryValueSub = this.questionanswerservice.filterCategoryValue$.subscribe((data) => {
      this.filterCategoryValue = data;
    });
    this.filterDifficultyValueSub = this.questionanswerservice.filterDifficultyValue$.subscribe((data) => {
      this.filterDifficultyValue = data;
    });
    this.onComplete().then(this.getCategories).then(this.getLevels);
    this.questionanswerservice.reload();
  }

  private onComplete() {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }

  public initiateAdd() {
    this.questionAnswerItem = this.questionanswerservice.initiateAdd();
  }

  public editItem(i: number) {
    this.questionAnswerItem = this.questionanswerservice.initiateEditItem(i);
  }

  public receiveFormSaveAdd(newItem: QuestionAnswerItemDTO) {
    newItem.evntOperId = this.currentUser.userName;
    this.questionanswerservice.saveResults(newItem);
  }

  public receiveFormSaveEdit(editItem: QuestionAnswerItemDTO) {
    editItem.evntOperId = this.currentUser.userName;
    this.questionanswerservice.saveResults(editItem);
  }

  public receiveFormCancel() {
    this.questionanswerservice.reload();
  }

  public deleteItem(i: number) {
    this.questionanswerservice.deleteItem(i);
  }

  private getCategories = () => {
    this.questionanswerservice.getCategories();
  }

  private getLevels = () => {
    this.questionanswerservice.getLevels();
  }

  public get isUser(): boolean {
    return this.getUserRole() === Role.USER;
  }

  public get isAdvUser(): boolean {
    return this.getUserRole() === Role.ADV_USER;
  }

  public get isPremUser(): boolean {
    return this.getUserRole() === Role.PREMIUM_USER;
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

  public search(params: string) {
    this.questionanswerservice.searchQuestionsAndAnswers(params);
  }

  public filter(params: FilterParamsDTO) {
    this.questionanswerservice.filter(params);
  }

  public resetFullList() {
    this.questionanswerservice.resetFullList();
  }

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    console.log("component destroy");
    this.questionanswerservice.destroy();
    /**
     * 13 total Subscriptions
     */
    this.loadedSub.unsubscribe();
    this.addModeSub.unsubscribe();
    this.editModeSub.unsubscribe();
    this.showFormSub.unsubscribe();
    this.paginationDisabledSub.unsubscribe();
    this.listSub.unsubscribe();
    this.categoryListSub.unsubscribe();
    this.levelListSub.unsubscribe();
    this.categoryFormListSub.unsubscribe();
    this.levelFormListSub.unsubscribe();
    this.totalQuestionsSub.unsubscribe();
    this.filterCategoryValueSub.unsubscribe();
    this.filterDifficultyValueSub.unsubscribe();
  }
}
