import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ResponseMessage} from '../../models/ResponseMessage';
import {QuestionService} from '../../services/question/question.service';
import {QuestionDTO} from '../../models/QuestionDTO';
import {ForeignKeyOptionsDTO} from '../../models/ForeignKeyOptionsDTO';
import {QuestionCategoryService} from '../../services/questioncategory/questioncategory.service';
import {QuestionCategoryDTO} from '../../models/QuestionCategoryDTO';
import {QuestionLevelService} from '../../services/questionlevel/questionlevel.service';
import {QuestionLevelDTO} from '../../models/QuestionLevelDTO';
import {AnswerService} from '../../services/answer/answer.service';
import {AnswerDTO} from '../../models/AnswerDTO';
import {NotificationType} from "../../enum/notification-type.enum";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NotificationService} from "../../services/notification/notification.service";
import {Role} from "../../enum/role.enum";
import {QuestionAnswerItemDTO} from "../../models/QuestionAnswerItemDTO";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  userPrivileges: boolean = false;
  advUserPrivileges: boolean = false;
  premiumUserPrivileges: boolean = false;
  adminPrivileges: boolean = false;
  superPrivileges: boolean = false;
  private subscriptions: Subscription[] = [];
  /**
   * this represents a record in the list, as well as the backing bean for the add/edit form
   */
  questionItem: QuestionAnswerItemDTO = new QuestionAnswerItemDTO();
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
  p: number = 1;
  itemsPerPage: number = 10;
  showExtended: boolean = true;
  loaded: boolean = false;
  alwaysHidden: boolean = true;
  enableAdd: boolean = false;
  showQuestionForm: boolean = false;
  addMode: boolean = false;
  editMode: boolean = false;
  addbarmsg: string = 'Add Question/Answer';
  saveChangesMsg: string = 'Save Changes';
  filterMsg: string = "Filter";
  cancelMsg: string = 'Cancel';
  resetToAllMsg: string = "View All";
  formmsg: string = 'Add Question/Answer';
  paginationDisabled: boolean = false;
  filterCategoryValue: number = null;
  filterDifficultyValue:number = null;
  totalQuestions: number = null;

  constructor(private questionservice: QuestionService, private questioncategoryservice: QuestionCategoryService,
              private questionlevelservice: QuestionLevelService, private answerservice: AnswerService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.userPrivileges = this.isUser;
    this.advUserPrivileges = this.isAdvUser;
    this.premiumUserPrivileges = this.isPremUser;
    this.adminPrivileges = this.isAdmin;
    this.superPrivileges = this.isSuper;
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
    //this.answerList = [];
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
            this.editMode = false;
            this.addMode = false;
            this.paginationDisabled = false;
            this.totalQuestions = this.fullquestionItemlist.length;
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

  public searchQuestion(searchTerm: string): void {
    const results: QuestionAnswerItemDTO[] = [];
    this.fullquestionItemlist.forEach(question => {
      if (!this.isNullOrUndefined(question.questionId) && question.questionId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(question.questionCategoryId) && question.questionCategoryId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(question.questionLevelId) && question.questionLevelId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(question.answerId) && question.answerId.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        !this.isNullOrUndefined(question.questionTxt) && question.questionTxt.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ) {
        results.push(question);
      }
    })
    this.questionItemlist = results;
    if (results.length === 0 || !searchTerm) {
      this.questionItemlist = this.fullquestionItemlist;
    }
  }

  initiateAdd() {
    this.editMode = false;
    this.addMode = true;
    this.showQuestionForm = true;
    this.paginationDisabled = true;
    this.questionItem = new QuestionAnswerItemDTO();
  }

  saveResults() {
    if (this.addMode) {
      this.subscriptions.push(
        this.questionservice.createQuestionAnswerPair(this.questionItem).subscribe(question => {
          this.questionItem = question;
          this.reload();
          this.questionItem = new QuestionAnswerItemDTO();
        })
      );
    } else if (this.editMode) {
      this.subscriptions.push(
        this.questionservice.updateQuestionAnswerPair(this.questionItem).subscribe(question => {
          this.questionItem = question;
          this.reload();
          this.questionItem.questionId = null;
          this.questionItem.questionCategoryId = null;
          this.questionItem.questionLevelId = null;
          this.questionItem.answerId = null;
          this.questionItem.questionTxt = '';
          this.paginationDisabled = false;
        })
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }



  editItem(i: number) {
    this.editMode = true;
    this.paginationDisabled = true;
    this.formmsg = 'Edit Question';
    this.questionItem = this.questionItemlist[i];
    this.showQuestionForm = true;
  }

  deleteItem(i: number) {
    this.subscriptions.push(
      this.questionservice.deleteQuestion(this.questionItemlist[i].questionId).subscribe(response => {
        this.reload();
        this.paginationDisabled = false;
      })
    );
  }

  findByQuestionCategoryId() {
    this.subscriptions.push(
      this.questionservice.findQuestionByQuestionCategoryId(this.questionItem.questionCategoryId).subscribe(response => {
        this.reload();
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

  filter() {
    const results: QuestionAnswerItemDTO[] = [];
    this.fullquestionItemlist.forEach(question => {
      if ( (this.filterCategoryValue === null || this.filterCategoryValue == question.questionCategoryId) &&
        (this.filterDifficultyValue === null || this.filterDifficultyValue == question.questionLevelId) ) {
        results.push(question);
      }
    })
    this.questionItemlist = results;
    this.totalQuestions = this.questionItemlist.length;
  }
  resetFullList() {
    this.questionItemlist = this.fullquestionItemlist;
    this.totalQuestions = this.questionItemlist.length;
    this.filterCategoryValue = null;
    this.filterDifficultyValue = null;
  }
}
