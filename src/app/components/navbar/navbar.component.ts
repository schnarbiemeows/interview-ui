import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

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
}
