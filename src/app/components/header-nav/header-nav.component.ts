import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationType } from "src/app/enum/notification-type.enum";
import { Role } from "src/app/enum/role.enum";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { NotificationService } from "src/app/services/notification/notification.service";

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
})
export class HeaderNavComponent implements OnInit {
  isLoggedIn: boolean = false;

  currentUrl: string;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoggedIn = this.isUserLoggedIn();
    this.currentUrl = this.router.url;
  }

  public displayMainPage():void {
    this.router.navigate(['/mainpage']);
  }

  public displayLogin(): void {
    this.router.navigate(['login']);
  }

  public displayRegistration(): void {
    this.router.navigate(['register']);
  }

  public displayAccountInfo() {
    this.router.navigate(['userinfo']);
  }

  public gotoAdminConsole():void {
    this.router.navigate(['/admin']);
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.isLoggedIn = false;
    this.sendNotificationMessage(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  public showMainPageLink(): boolean {
    return this.router.url != '/mainpage';
  }

  public isUserLoggedIn(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
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
}