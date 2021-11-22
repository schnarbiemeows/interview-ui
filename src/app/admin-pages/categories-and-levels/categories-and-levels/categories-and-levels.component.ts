import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Role} from "../../../enum/role.enum";
import {QuestionCategoryService} from "../../../services/questioncategory/question-category.service";
import {QuestionLevelService} from "../../../services/questionlevel/question-level.service";
import {QuestionCategoryDTO} from "../../../models/QuestionCategoryDTO";
import {QuestionLevelDTO} from "../../../models/QuestionLevelDTO";
import {NotificationService} from "../../../services/notification/notification.service";
import {NotificationType} from "../../../enum/notification-type.enum";
import {InterviewUserDTO} from "../../../models/InterviewUserDTO";


@Component({
  selector: 'app-categories-and-levels2',
  templateUrl: './categories-and-levels.component.html',
  styleUrls: ['./categories-and-levels.component.css']
  //providers: [QuestionCategoryService, QuestionLevelService]
})
export class CategoriesAndLevelsComponent implements OnInit, OnDestroy {
  currentUser: InterviewUserDTO;
  // modes and page states
  public loadedLevel: boolean = true;
  public loadedCategory:boolean = true;
  private addModeLevel:boolean;
  private editModeLevel:boolean;
  private addModeCategory:boolean;
  private editModeCategory:boolean;
  private showQuestionLevelForm: boolean;
  private showQuestionCategoryForm: boolean;
  private paginationDisabledCategory: boolean;
  private loadedLvlSub: Subscription = null;
  private loadedCatgSub: Subscription = null;
  private addModeLevelSub: Subscription = null;
  private editModeLevelSub: Subscription = null;
  private addModeCategorySub: Subscription = null;
  private editModeCategorySub: Subscription = null;
  private showLvlFormSub: Subscription = null;
  private showCatgFormSub: Subscription = null;
  private paginationDisabledCatgSub: Subscription = null;

  // page data
  private questioncategorylist: QuestionCategoryDTO[];
  private questionlevellist: QuestionLevelDTO[];
  // these two object represent either a new Category or Item, or a Category or Item to be edited
  private levelItem: QuestionLevelDTO;
  private categoryItem: QuestionCategoryDTO;

  private catgListSub: Subscription = null;
  private levelListSub: Subscription = null;
  sqlLvlSrchMsg: string = "Search Levels";
  sqlCatgSrchMsg: string = "Search Categories";

  constructor(private questionCategoryService: QuestionCategoryService,
              private questionlevelService: QuestionLevelService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserFromLocalCache();
    // subscribe to the page modes and states
    this.addModeLevelSub = this.questionlevelService.addMode$.subscribe((data) => {
      this.addModeLevel = data;
    });
    this.editModeLevelSub = this.questionlevelService.editMode$.subscribe((data) => {
      this.editModeLevel = data;
    });
    this.addModeCategorySub = this.questionCategoryService.addMode$.subscribe((data) => {
      this.addModeCategory = data;
    });
    this.editModeCategorySub = this.questionCategoryService.editMode$.subscribe((data) => {
      this.editModeCategory = data;
    });
    this.loadedLvlSub = this.questionlevelService.loaded$.subscribe((data) => {
      this.loadedLevel = data;
    });
    this.loadedCatgSub = this.questionCategoryService.loaded$.subscribe((data) => {
      this.loadedCategory = data;
    });
    this.paginationDisabledCatgSub = this.questionCategoryService.paginationDisabled$.subscribe((data) => {
      this.paginationDisabledCategory = data;
    });
    this.showCatgFormSub = this.questionCategoryService.showForm$.subscribe((data) => {
      this.showQuestionCategoryForm = data;
    });
    this.showLvlFormSub = this.questionlevelService.showForm$.subscribe((data) => {
      this.showQuestionLevelForm = data;
    });
    // subscribe to the data lists
    this.levelListSub = this.questionlevelService.questionlevellist$.subscribe((data) => {
      this.questionlevellist = data;
    });
    this.catgListSub = this.questionCategoryService.questioncategorylist$.subscribe((data) => {
      this.questioncategorylist = data;
    });
    this.reloadLevel();
    this.reloadCategory();
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

  reloadCategory() {
    this.questionCategoryService.reloadCategory();
  }

  reloadLevel() {
    this.questionlevelService.reloadLevel();
  }

  public searchCategory(param: string) {
    this.questionCategoryService.searchQuestionCategory(param);
  }

  public searchLevel(param: string) {
    this.questionlevelService.searchQuestionLevel(param);
  }

  initiateAddCategory() {
    this.categoryItem = this.questionCategoryService.initiateAddCategory();
    this.questionCategoryService.changeShowForm(true);
  }

  initiateAddLevel() {
    this.levelItem = this.questionlevelService.initiateAddLevel();
    this.questionCategoryService.disablePagination(true);
    this.questionlevelService.changeShowForm(true);
  }

  public receiveAndRelayInitiateEditCategory(itemNumber:number) {
    console.log("receiving edit = " + itemNumber);
    this.questionCategoryService.disablePagination(true);
    this.categoryItem = this.questionCategoryService.initiateEditCategoryItem(itemNumber);
  }

  public receiveAndRelayDeleteCategory(itemNumber:number) {
    console.log("receiving delete = " + itemNumber);
    this.questionCategoryService.deleteCategoryItem(itemNumber);
  }

  public receiveAndRelayInitiateEditLevel(itemNumber:number) {
    console.log("receiving edit = " + itemNumber);
    this.questionCategoryService.disablePagination(true);
    this.levelItem = this.questionlevelService.initiateEditLevelItem(itemNumber);
  }

  public receiveAndRelayDeleteLevel(itemNumber:number) {
    console.log("receiving delete = " + itemNumber);
    this.questionlevelService.deleteLevelItem(itemNumber);
    this.questionCategoryService.disablePagination(false);
  }

  public receiveLevelFormSaveAdd(newLevelItem: QuestionLevelDTO) {
    newLevelItem.evntOperId = this.currentUser.userName;
    console.log("receiving level form save "  + newLevelItem);
    this.questionlevelService.saveResultsLevel(newLevelItem);
    this.questionCategoryService.disablePagination(false);
  }

  public receiveCategoryFormSaveAdd(newCategoryItem: QuestionCategoryDTO) {
    newCategoryItem.evntOperId = this.currentUser.userName;
    console.log("receiving Category form save");
    this.questionCategoryService.saveResultsCategory(newCategoryItem);
  }

  public receiveLevelFormSaveEdit(levelItem: QuestionLevelDTO) {
    levelItem.evntOperId = this.currentUser.userName;
    console.log("receiving level form save ");
    this.questionlevelService.saveResultsLevel(levelItem);
    this.questionCategoryService.disablePagination(false);
  }

  public receiveCategoryFormSaveEdit(categoryItem: QuestionCategoryDTO) {
    categoryItem.evntOperId = this.currentUser.userName;
    console.log("receiving Category form save");
    this.questionCategoryService.saveResultsCategory(categoryItem);
  }

  public receiveLevelFormCancel(event: any) {
    console.log("receiving Level form cancel");
    this.questionlevelService.reloadLevel();
    this.questionCategoryService.disablePagination(false);
  }

  public receiveCategoryFormCancel(event: any) {
    console.log("receiving Category form cancel");
    this.questionCategoryService.reloadCategory();
  }

  private sendNotificationMessage(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    console.log("destroying");
    this.questionlevelService.destroy();
    this.questionCategoryService.destroy();
    this.addModeLevelSub.unsubscribe();
    this.editModeLevelSub.unsubscribe();
    this.addModeCategorySub.unsubscribe();
    this.editModeCategorySub.unsubscribe();
    this.loadedLvlSub.unsubscribe();
    this.loadedCatgSub.unsubscribe();
    this.showCatgFormSub.unsubscribe();
    this.showLvlFormSub.unsubscribe();
    this.levelListSub.unsubscribe();
    this.catgListSub.unsubscribe();
    this.paginationDisabledCatgSub.unsubscribe();
  }
}
