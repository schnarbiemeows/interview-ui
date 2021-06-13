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
  isOnAdminDashboard: boolean;
  currentUrl: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.isLoggedIn = this.isUserLoggedIn();
    this.currentUrl = this.router.url;
    this.isOnAdminDashboard = this.isUrlInAdminDashboardList();
  }

  private isUrlInAdminDashboardList() {
    if(this.currentUrl.endsWith("admin")||this.currentUrl.endsWith("question")||
      this.currentUrl.endsWith("questioncategory")||this.currentUrl.endsWith("interviewuser")) {
      return true;
    }
    return false;
  }

  public onLogOut(): void {
    this.isOnAdminDashboard = false;
    this.authenticationService.logOut();
    this.isLoggedIn = false;
    this.sendNotificationMessage(NotificationType.SUCCESS, `You've been successfully logged out`);
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
