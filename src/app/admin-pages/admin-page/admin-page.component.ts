import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Role} from "../../enum/role.enum";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  /**
   * TODO - none of this code is needed
   * BUT - turn this page into a summary page that has a table of how many questions there are
   * of each category and level
   */
  userPrivileges:boolean = false;
  advUserPrivileges:boolean = false;
  premiumUserPrivileges:boolean = false;
  adminPrivileges:boolean = false;
  superPrivileges:boolean = false;
  showUsers:boolean = false;
  showQuestions:boolean = false;
  showQuestionCategories:boolean = false;
  showQuestionLevels:boolean = false;
  showAnswers:boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userPrivileges = this.isUser;
    this.advUserPrivileges = this.isAdvUser;
    this.premiumUserPrivileges = this.isPremUser;
    this.adminPrivileges = this.isAdmin;
    this.superPrivileges = this.isSuper;
  }

  public gotoAdminConsole():void {
    this.router.navigate(['/mainpage']);
  }

  public displayUsers():void {
    this.showUsers = true;
    this.showQuestions = false;
    this.showQuestionCategories = false;
    this.showQuestionLevels = false;
    this.showAnswers = false;
  }
  public displayQuestions():void {
    this.showUsers = false;
    this.showQuestions = true;
    this.showQuestionCategories = false;
    this.showQuestionLevels = false;
    this.showAnswers = false;
  }
  public displayQuestionCategories():void {
    this.showUsers = false;
    this.showQuestions = false;
    this.showQuestionCategories = true;
    this.showQuestionLevels = false;
    this.showAnswers = false;
  }
  public displayQuestionLevels():void {
    this.showUsers = false;
    this.showQuestions = false;
    this.showQuestionCategories = false;
    this.showQuestionLevels = true;
    this.showAnswers = false;
  }
  public displayAnswers():void {
    this.showUsers = false;
    this.showQuestions = false;
    this.showQuestionCategories = false;
    this.showQuestionLevels = false;
    this.showAnswers = true;
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

}
