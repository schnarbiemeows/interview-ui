import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import {Role} from "../enum/role.enum";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private notificationService: NotificationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log("inside the admin guard")
    return this.isUserLoggedIn() && this.isAdmin;
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      //console.log("user is logged in")
      return true;
    }
    this.router.navigate(['/mainpage']);
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    return false;
  }

  private get isAdmin(): boolean {
    if (this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN) {
      //console.log("user is an Admin")
      return true;
    }
    this.router.navigate(['/mainpage']);
    this.notificationService.notify(NotificationType.ERROR, `You do not have permissions to access that page`);
    return false;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().roles;
  }
}
