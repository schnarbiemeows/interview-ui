import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import {NotificationType} from "../../enum/notification-type.enum";
import {NotificationService} from "../../services/notification/notification.service";
import {Subscription} from "rxjs";
import {QuestionDTO} from "../../models/QuestionDTO";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";
import {AnswerDTO} from "../../models/AnswerDTO";
import {ForeignKeyOptionsDTO} from "../../models/ForeignKeyOptionsDTO";
import {QuestionService} from "../../services/question/question.service";
import {QuestionCategoryService} from "../../services/questioncategory/questioncategory.service";
import {QuestionLevelService} from "../../services/questionlevel/questionlevel.service";
import {AnswerService} from "../../services/answer/answer.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  userPrivileges:boolean = false;
  advUserPrivileges:boolean = false;
  premiumUserPrivileges:boolean = false;
  adminPrivileges:boolean = false;
  superPrivileges:boolean = false;
  isLoggedIn:boolean = false;
  loaded: boolean = false;
  showQuestionForm: boolean = false;
  filterCategoryValue: number = null;
  filterDifficultyValue:number = null;
  showQuestionMode: boolean = false;
  showAnswerMode: boolean = false;
  showQuestionsMsg: string = "Start Questions"
  nextQuestionMsg: string = "Next Question"
  showAnswerMsg: string = "Show Answer";
  /**
   * this represents the current Question/Answer pair being displayed
   */
  questionItem: QuestionAnswerItemDTO = null;
  /**
   * this represents the current list of records being displayed
   */
  questionItemlist: QuestionAnswerItemDTO[] = [];
  /**
   * this represents the full list of all question/answer pairs
   */
  fullquestionItemlist: QuestionAnswerItemDTO[] = [];
  questionList: QuestionDTO[] = [];
  questioncategorylist: ForeignKeyOptionsDTO[] = [];
  questioncategorymap = new Map();
  questionlevellist: ForeignKeyOptionsDTO[] = [];
  questionlevelmap = new Map();
  answermap = new Map();

  constructor(private router: Router, private questionservice: QuestionService,
              private questioncategoryservice: QuestionCategoryService,
              private questionlevelservice: QuestionLevelService, private answerservice: AnswerService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoggedIn = this.isUserLoggedIn();
    if(this.isLoggedIn==true) {
      this.userPrivileges = this.isUser;
      this.advUserPrivileges = this.isAdvUser;
      this.premiumUserPrivileges = this.isPremUser;
      this.adminPrivileges = this.isAdmin;
      this.superPrivileges = this.isSuper;
    }
    /**
     * load all of the question categories
     */
    this.subscriptions.push(
      this.questioncategoryservice.getAllQuestionCategory().subscribe(questioncategorylist => {
        for (let entry of questioncategorylist) {
          let optionDTO = new ForeignKeyOptionsDTO();
          optionDTO.value = entry.questionCategoryId;
          optionDTO.viewValue = entry.questionCategoryDesc;
          this.questioncategorylist.push(optionDTO);
          this.questioncategorymap.set(optionDTO.value, optionDTO.viewValue);
        }
        /**
         * load all of the question levels
         */
        this.subscriptions.push(
          this.questionlevelservice.getAllQuestionLevel().subscribe(questionlevellist => {
            for (let entry of questionlevellist) {
              let optionDTO = new ForeignKeyOptionsDTO();
              optionDTO.value = entry.questionLevelId;
              optionDTO.viewValue = entry.questionLevelDesc;
              this.questionlevellist.push(optionDTO);
              this.questionlevelmap.set(optionDTO.value, optionDTO.viewValue);
            }
            this.reload();
          })
        );
      })
    );
  }

  reload() {
    this.loaded = false;
    /**
     * load all of the questions
     */
    this.questionList = [];
    this.answermap = new Map();
    this.fullquestionItemlist = [];
    this.subscriptions.push(
      this.questionservice.getAllQuestion().subscribe(questionlist => {
        this.questionList = questionlist;
        /**
         * load all of the answers
         */
        this.subscriptions.push(
          this.answerservice.getAllAnswer().subscribe(answerlist => {
            for (let entry of answerlist) {
              this.answermap.set(entry.answerId, entry);
            }
            this.loadTheFullQuestionAnswerList(this.questionList, this.answermap);
            this.copyFullListIntoDisplayList();
            this.loaded = true;
            this.showQuestionForm = false;
            /*this.editMode = false;
            this.addMode = false;
            this.paginationDisabled = false;*/
            //this.totalQuestions = this.fullquestionItemlist.length;
            this.filterCategoryValue = null;
            this.filterDifficultyValue = null;
          })
        );
      })
    );
  }

  private loadTheFullQuestionAnswerList(questionList: QuestionDTO[], answermap: any) {
    questionList.forEach(item => {
      let dto:QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
      dto.questionId = item.questionId;
      dto.questionTxt = item.questionTxt;
      dto.answerId = item.answerId;
      let  answer:AnswerDTO = answermap.get(item.answerId);
      dto.answerTxt = answer.answerTxt;
      dto.questionLevelId = item.questionLevelId;
      dto.questionCategoryId = item.questionCategoryId;
      this.fullquestionItemlist.push(dto);
    })
  }

  private copyFullListIntoDisplayList() {
    this.questionItemlist = [];
    this.fullquestionItemlist.forEach(item => {
      this.questionItemlist.push(item);
    })
  }

  showQuestion() {
    this.showQuestionMode = true;
    this.showAnswerMode = false;
    this.filterQuestions();
    let size = this.questionItemlist.length;
    if(size>0) {
      let index = this.getRandomInt(size);
      this.questionItem = this.questionItemlist[index];
    } else {
      this.showQuestionMode = false;
      this.showAnswerMode = false;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  showAnswer() {
    this.showAnswerMode = true;
  }

  showNextQuestion() {
    this.showAnswerMode = false;
    this.showQuestionMode = true;
    this.showQuestion();
  }

  public displayLogin():void {
    this.router.navigate(['login']);
  }
  public displayRegistration():void {
    this.router.navigate(['register']);
  }

  public displayAccountInfo() {
    this.router.navigate(['userinfo']);
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

  public isUserLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.isLoggedIn = false;
    this.sendNotificationMessage(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  public gotoAdminConsole():void {
    this.router.navigate(['/admin']);
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

  filterQuestions() {
    const results: QuestionAnswerItemDTO[] = [];
    this.fullquestionItemlist.forEach(question => {
      if ( (this.filterCategoryValue === null || this.filterCategoryValue == question.questionCategoryId) &&
        (this.filterDifficultyValue === null || this.filterDifficultyValue == question.questionLevelId) ) {
        results.push(question);
      }
    })
    this.questionItemlist = results;
  }

  resetFullList() {
    this.questionItemlist = this.fullquestionItemlist;
    this.filterCategoryValue = null;
    this.filterDifficultyValue = null;
  }

  onSubmit(e) {
    e.preventDefault();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  displayAboutPage() {
    this.router.navigate(['/about']);
  }
}
